import {
  CreateLobbyResponse,
  JoinLobbyResponse,
  UseCustomLobbyRequest,
  UseCustomLobbyResponse,
} from "../types/custom-lobby-types";
import {
  DiscoverRequest,
  DiscoverTypes,
  EMPTY_SUCCESFUL_RESPONSE,
  LoginRequest,
  LoginResponse,
  MathmakingInfoResponse,
  RefreshRequest,
  SetCharacterLoadoutRequest,
  SetCharacterLoadoutResponse,
  SetWeaponLoadoutsForCharacterRequest,
  SetWeaponLoadoutsForCharacterResponse,
  SlotChangesRequest,
  SlotChangesResponse,
  UploadPlayerSettingsRequest,
  UploadPlayerSettingsResponse,
} from "../types/vhs-the-game-types";
import {
  Monsters,
  SaveGameResponse,
  Teens,
} from "../types/save-game";
import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AdminHandler } from "./admin-handler";
import { Collections } from "./database";
import { DBConstants } from "./constants";
import { Document } from "@seald-io/nedb";
import { Logger } from "./logger";
import { ServerInfo } from "../types/server-info";
import { User } from "../types/user";
import { db } from "..";
import deepmerge from 'deepmerge';
import jwt_to_pem from 'jwk-to-pem';
import randomstring from "randomstring";

type DiscoverResponse = SaveGameResponse | MathmakingInfoResponse;

export class Handler {
  static roomMap = new Map<string, string>();
  static epicKeys: any[] = [];

  static async wrapper(
    request: Request,
    response: Response,
    fn: (request: Request, response: Response) => Promise<unknown>
  ) {
    fn(request, response).catch(e => {
      if (e?.toString() === '401') {
        response.status(401).send();
      } else {
        Logger.log('Error in request ' + request.path, String(e));
        response.send(EMPTY_SUCCESFUL_RESPONSE);
      }
    });
  }

  static async login(
    request: Request<LoginRequest>,
    response: Response<LoginResponse | string>
  ) {
    const collection = db.collection<User>(Collections.USERS);
    const token = request.header("Authorization")?.split(" ")[1];
    if (!token) {
      return response.status(401).send("Token not found");
    }
    try {
      if (!Handler.epicKeys || Handler.epicKeys.length === 0){
        const epicResponse = await (await fetch('https://api.epicgames.dev/auth/v1/oauth/jwks')).json();
        Handler.epicKeys = epicResponse.keys.map((key: any) => jwt_to_pem(key));
      }
    } catch (e) {
      return response.status(401).send("Token malformed");
    }
    let parsedToken: JwtPayload | undefined;
    for (let i = 0; i < Handler.epicKeys.length && !parsedToken; i++) {
      try {
        parsedToken = jwt.verify(token, Handler.epicKeys[i], {}) as JwtPayload;
      } catch (e) {
      }
    }
    if (!parsedToken) {
      return response.status(401).send("Token not signed by Epic");
    }
    const epicId = parsedToken.sub;
    const currentTime = Date.now() / 1000;
    if (!epicId || !parsedToken.exp || parsedToken.exp < currentTime) {
      Logger.log('Ilegal token');
      return response.status(401).send("Token malformed");
    }
    let existingUser = await collection.findOneAsync<Document<User>>({
      epicId,
    });
    let id: string;
    let name = "Dummy";
    if (existingUser) {
      id = existingUser._id;
    } else {
      id = (await collection.insertAsync({ displayName: name, epicId }))._id;
    }
    const sign = Handler.generateToken(id);
    response.send({
      data: {
        displayName: name,
        playerAccountId: id,
        sessionTicketId: sign,
      },
      log: { logSuccessful: true },
    });
  }

  static async refreshToken(request: Request<any, LoginResponse, RefreshRequest>, response: Response<LoginResponse>) {
    const id = Handler.checkOwnTokenAndGetId(request);
    const token = Handler.generateToken(id);
    Logger.log("Refreshed token for user", id);
    Logger.log("Request", JSON.stringify(request.body));
    
    const responseObj = {
      data: {
        displayName: 'dummy',
        sessionTicketId: token,
        playerAccountId: id
      },
      log: { logSuccessful: true }
    };
    Logger.log("Response", JSON.stringify(responseObj));
    response.send(responseObj);
  }

  static async discover(
    request: Request<any, DiscoverResponse | string, DiscoverRequest>,
    response: Response<DiscoverResponse | string>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request);
    switch (request.body.bitsToDiscover) {
      case DiscoverTypes.MATCHMAKING_INFO:
        (response as Response<MathmakingInfoResponse>).send({
          data: {
            DDT_DynamicBountyRewardsBit: {
              lastEarnedBounty: 10,
              MR_EU_Central1: { bountiesByCharType: { CT_Werewolf: 999 } },
            },
          },
          log: { logSuccessful: true },
        });
        break;
      default:
        console.error("Unknown discover type", request.body.bitsToDiscover);
      case DiscoverTypes.INITIAL_LOAD:
        try {
          const [userSaveGame, serverInfo] = await Promise.all([Handler.getUserSaveGame(request.body.accountIdToDiscover ?? id), Handler.getGeneralServerInfo()]);
          // TODO when we actually implement the bitsToDiscoverFlag PROPERLY we should remove this
          if (request.body.accountIdToDiscover != null) {
            delete userSaveGame.data.playerSettingsData;
          }
          userSaveGame.data.DDT_SpecificLoadoutsBit = userSaveGame.data.DDT_AllLoadoutsBit;
          // End of the TODO remove in the future block
          return response.send(deepmerge(userSaveGame, serverInfo));
        } catch (e) {
          const str = String(e);
          response.status(500).send(str);
        }
        break;
    }
  }

  static async setCharacterLoadout(
    request: Request<
      any,
      SetCharacterLoadoutResponse | string,
      SetCharacterLoadoutRequest
    >,
    response: Response<SetCharacterLoadoutResponse | string>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request);
    const saveData = await Handler.getUserSaveGame(id);
    const loadout =
      saveData.data.DDT_AllLoadoutsBit?.characterLoadouts[
        request.body.characterType as Teens | Monsters
      ];
    if (!loadout) {
      throw new Error("Unknown character");
    }
    Object.assign(loadout.uiSlots, request.body.loadoutChanges);
    await db
      .collection(Collections.SAVE_GAME)
      .updateAsync({ [DBConstants.userIdField]: id }, saveData);
    return response.send({
      log: { logSuccessful: true },
      data: {
        changedSlotNames: Object.keys(request.body.loadoutChanges),
        characterLoadout: loadout,
      },
    });
  }

  static async setCharacterSlots(
    request: Request<any, SlotChangesResponse | string, SlotChangesRequest>,
    response: Response<SlotChangesResponse | string>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request);
    const saveData = await Handler.getUserSaveGame(id);
    const loadout = saveData.data.DDT_AllPlayerSlotsBit?.playerAccountSlots;
    if (!loadout) {
      throw new Error("Unknown character");
    }
    for (const change of Object.entries(request.body.slotChanges)) {
      if (change[1] && typeof (loadout as any)[change[0]] === "string") {
        ((loadout as any)[change[0]] as string) = change[1];
      }
    }
    await db
      .collection(Collections.SAVE_GAME)
      .updateAsync({ [DBConstants.userIdField]: id }, saveData);
    return response.send({
      log: { logSuccessful: true },
      data: {
        // TODO return the truth instead of this
        changedSlotNames: Object.keys(request.body.slotChanges).map((item) => {
          return { [item]: true };
        }),
        playerSlots: loadout,
      },
    });
  }

  static async setCharacterWeapon(
    request: Request<
      any,
      SetWeaponLoadoutsForCharacterResponse | string,
      SetWeaponLoadoutsForCharacterRequest
    >,
    response: Response<SetWeaponLoadoutsForCharacterResponse | string>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request,);
    const saveData = await Handler.getUserSaveGame(id);
    ///@ts-ignore incomplete typings
    const loadout:
      | {
          [x: string]: {
            skin?: { [x: string]: string };
            perk?: { [x: string]: string };
            unlockLevel?: number;
          };
        }
      | undefined =
      saveData.data.DDT_AllWeaponsBit?.weaponLoadoutsByCharacterType?.[
        request.body.characterType as Teens | Monsters
      ];
    if (!loadout) {
      throw new Error("Unknown character");
    }
    for (const weapon of Object.entries(request.body.weaponChanges)) {
      for (const property of Object.entries(weapon[1])) {
        if (loadout[weapon[0]].perk?.[property[0]] != null) {
          loadout[weapon[0]]!.perk![property[0]] = property[1];
        } else if (loadout[weapon[0]].skin?.[property[0]] != null) {
          loadout[weapon[0]]!.skin![property[0]] = property[1];
        }
      }
    }
    await db
      .collection(Collections.SAVE_GAME)
      .updateAsync({ [DBConstants.userIdField]: id }, saveData);
    return response.send({
      log: { logSuccessful: true },
      data: {
        [request.body.characterType]: loadout,
      },
    });
  }

  static async setCharacterSettings(
    request: Request<
      any,
      UploadPlayerSettingsResponse | string,
      UploadPlayerSettingsRequest
    >,
    response: Response<UploadPlayerSettingsResponse | string>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request);
    let success: boolean;
    try {
      await db.collection(Collections.SAVE_GAME).updateAsync(
        { [DBConstants.userIdField]: id },
        {
          $set: {
            "data.playerSettingsData": request.body.playerSettingsData,
          },
        }
      );
      success = true;
    } catch (e) {
      success = false;
    }
    return response.send({
      log: { logSuccessful: true },
      data: {
        uploadSuccessful: success,
      },
    });
  }

  static async lobby(
    request: Request<
      any,
      UseCustomLobbyResponse | string,
      UseCustomLobbyRequest
    >,
    response: Response<UseCustomLobbyResponse | string>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request);
    switch (request.body.action) {
      case "createLobby":
        let code: string;
        do {
          code = randomstring.generate({
            capitalization: "uppercase",
            length: 5,
            readable: true,
          });
        } while (Handler.roomMap.has(code));
        // TODO timeout to remove from map
        // Todo what if connectionStirng is not provided
        Handler.roomMap.set(code, request.body.connectionString!);
        Logger.log(`Room code ${code} generated by user`, id);
        (response as Response<CreateLobbyResponse>).send({
          data: { lobbyCode: code },
          log: { logSuccessful: true },
        });
        break;
      case "joinLobby":
        const lobbyCode = request.body.lobbyCode!;
        const connectionString = Handler.roomMap.get(lobbyCode.toUpperCase());
        if (connectionString) {
          Logger.log("Room code found", lobbyCode);
          (response as Response<JoinLobbyResponse>).send({
            log: { logSuccessful: true },
            data: { connectionString, discoverKey: "dummy", lobbyFound: true },
          });
        } else {
          Logger.log("Room code NOT found", lobbyCode);
          (response as Response<JoinLobbyResponse>).send({
            log: { logSuccessful: true },
            data: {
              connectionString: "dummy",
              discoverKey: "dummy",
              lobbyFound: false,
            },
          });
        }
        break;
      default:
        Logger.log("Unkown custom lobby action", request.body.action);
        response.send(EMPTY_SUCCESFUL_RESPONSE as CreateLobbyResponse);
    }
  }

  private static checkOwnTokenAndGetId(req: Request<unknown>) {
    const token =  req.header("Authorization")?.split(" ")[1];
    let id = 'Dummy';
    try {
      id = jwt.verify(token!, db.token) as string;
    } catch (e) {
      Logger.log("INVALID USER TOKEN", token)
      throw new Error("401");
    }
    id = AdminHandler.getImpersonatedId(id);
    return id;
  }

  private static async getUserSaveGame(userId: string) {
    const collection = db.collection<SaveGameResponse>(Collections.SAVE_GAME);
    let userSaveGame =
      await collection.findOneAsync({
        [DBConstants.userIdField]: userId,
      });
    if (!userSaveGame) {
      userSaveGame = await collection.findOneAsync({
        [DBConstants.userIdField]: DBConstants.baseSaveGameId,
      });
      if (!userSaveGame) {
        throw new Error("Cannot create saveGame");
      }
      delete userSaveGame._id;
      userSaveGame[DBConstants.userIdField] = userId;
      collection.insertAsync(userSaveGame);
    }
    return userSaveGame;
  }

  /**
   * Get info that's general for the whole server, not of an specific user
   *  */
  private static async getGeneralServerInfo(): Promise<Partial<SaveGameResponse>> {
    const collection = db.collection<ServerInfo>(Collections.SERVER_INFO);
    const event = (await collection.findOneAsync({})).currentEvent;
    return {data: {DDT_SeasonalEventBit: {activeSeasonalEventTypes: [event]}}}
  }

  
  private static generateToken(id: string) {
    return jwt.sign(id, db.token);
  }
}
