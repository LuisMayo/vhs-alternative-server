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
  SetCharacterLoadoutRequest,
  SetCharacterLoadoutResponse,
  SetWeaponLoadoutsForCharacterRequest,
  SetWeaponLoadoutsForCharacterResponse,
  SlotChangesRequest,
  SlotChangesResponse,
  UploadPlayerSettingsRequest,
  UploadPlayerSettingsResponse,
} from "../types/vhs-the-game-types";
import { Monsters, SaveGameResponse, Teens } from "../types/save-game";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AdminHandler } from "./admin-handler";
import { Collections } from "./database";
import { DBConstants } from "./constants";
import { Document } from "@seald-io/nedb";
import { LobbyManager } from "./lobby-manager";
import { Logger } from "./logger";
import { PartialDeep } from 'type-fest';
import { ServerInfo } from "../types/server-info";
import { User } from "../types/user";
import { db } from "..";
import deepmerge from "deepmerge";
import jwt_to_pem from "jwk-to-pem";
import { readFile } from "fs/promises";

type DiscoverResponse = SaveGameResponse | MathmakingInfoResponse;

export class Handler {
  private static baseSaveGameId?: SaveGameResponse;
  static epicKeys: any[] = [];

  static async wrapper(
    request: Request,
    response: Response,
    fn: (request: Request, response: Response) => Promise<unknown>
  ) {
    fn(request, response).catch((e) => {
      if (e?.toString() === "401") {
        response.sendStatus(500);
      } else {
        Logger.log("Error in request " + request.path, String(e));
        response.send(EMPTY_SUCCESFUL_RESPONSE);
      }
    });
  }

  static async login(
    request: Request<LoginRequest>,
    response: Response<LoginResponse | string>
  ) {
    const collection = db.collection<User>(Collections.USERS);
    const epicId = process.argv.includes("--bypassEpicValidation")
      ? Handler.getUnAuthenticatedEpicId(request)
      : await Handler.getAuthenticatedEpicUserId(request);
    if (!epicId) {
      return response.sendStatus(401);
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
          const [userSaveGame, serverInfo] = await Promise.all([
            Handler.getUserSaveGame(request.body.accountIdToDiscover ?? id),
            Handler.getGeneralServerInfo(),
          ]);
          // TODO when we actually implement the bitsToDiscoverFlag PROPERLY we should remove this
          if (request.body.accountIdToDiscover != null) {
            delete userSaveGame.data.playerSettingsData;
          }
          userSaveGame.data.DDT_SpecificLoadoutsBit =
            userSaveGame.data.DDT_AllLoadoutsBit;
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
    const id = Handler.checkOwnTokenAndGetId(request);
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

  /*  static async redeemCode(
    request: Request<
      any,
      RedeemCodeResponse | string,
      RedeemCodeRequest
    >,
    response: Response<RedeemCodeResponse>
  ) {
    const id = Handler.checkOwnTokenAndGetId(request);
    const saveData = await Handler.getUserSaveGame(id);
    const availableCodes = JSON.parse(
      await readFile("./data/redeem-codes.json", { encoding: "utf-8" })
    );
    // DO a find to find if the redeemed code is on our JSON, if it is grant the thingies to the saveGame
    const codeData =

    if (saveData &&)
  }*/

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
        const lobby = LobbyManager.createLobby(
          id,
          request.body.connectionString!
        );
        (response as Response<CreateLobbyResponse>).send({
          data: { lobbyCode: lobby.code },
          log: { logSuccessful: true },
        });
        break;
      case "joinLobby":
        const lobbyCode = request.body.lobbyCode!;
        const connectionString = LobbyManager.joinLobby(id, lobbyCode);
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
      case "closeLobby":
        LobbyManager.closeLobby(id);
        response.send(EMPTY_SUCCESFUL_RESPONSE as CreateLobbyResponse);
        break;
      default:
        Logger.log("Unkown custom lobby action", request.body.action);
        response.send(EMPTY_SUCCESFUL_RESPONSE as CreateLobbyResponse);
    }
  }

  public static getId(token: string | undefined) {
    let id = 'Dummy';
    try {
      id = jwt.verify(token!, db.token) as string;
    } catch (e) {
      Logger.log("INVALID USER TOKEN", token);
      throw new Error("401");
    }
    id = AdminHandler.getImpersonatedId(id);
    return id;
  }

  private static checkOwnTokenAndGetId(req: Request<unknown>) {
    if (process.argv.includes("--bypassOwnValidation")) {
      return req.header("Authorization") ?? "dummy";
    }
    const token =  req.header("Authorization")?.split(" ")[1];
    return Handler.getId(token);
  }

  private static async getUserSaveGame(userId: string): Promise<SaveGameResponse> {
    const collection = db.collection<PartialDeep<SaveGameResponse>>(Collections.SAVE_GAME);
    let userSaveGame = await collection.findOneAsync({
      [DBConstants.userIdField]: userId,
    });
    if (!Handler.baseSaveGameId) {
      Handler.baseSaveGameId = JSON.parse(
        await readFile("./data/base.json", { encoding: "utf-8" })
      );
    }
    if (!userSaveGame && Handler.baseSaveGameId) {
      userSaveGame = {
        data: {
          DDT_AccountStatsBit: Handler.baseSaveGameId.data.DDT_AccountStatsBit,
          DDT_AllLoadoutsBit: {
            characterLoadouts: {
              CT_Anomaly: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Anomaly.uiSlots
              },
              CT_Cheerleader: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Cheerleader.uiSlots
              },
              CT_DollMaster: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_DollMaster.uiSlots
              },
              CT_Eradicator: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Eradicator.uiSlots
              },
              CT_Jock: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Jock.uiSlots
              },
              CT_Nerd: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Nerd.uiSlots
              },
              CT_Outsider: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Outsider.uiSlots
              },
              CT_Punk: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Punk.uiSlots
              },
              CT_Toad: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Toad.uiSlots
              },
              CT_Virgin: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Virgin.uiSlots
              },
              CT_Werewolf: {
                uiSlots: Handler.baseSaveGameId.data.DDT_AllLoadoutsBit!.characterLoadouts.CT_Werewolf.uiSlots
              },
            }
          },
          DDT_AllPlayerSlotsBit: Handler.baseSaveGameId.data.DDT_AllPlayerSlotsBit,
          DDT_AllWeaponsBit: {
            weaponLoadoutsByCharacterType: Handler.baseSaveGameId.data.DDT_AllWeaponsBit?.weaponLoadoutsByCharacterType
          },
          DDT_SpecificLoadoutsBit: Handler.baseSaveGameId.data.DDT_SpecificLoadoutsBit,
          playerSettingsData: Handler.baseSaveGameId.data.playerSettingsData
        }
      };
      delete userSaveGame._id;
      userSaveGame[DBConstants.userIdField] = userId;
      collection.insertAsync(userSaveGame);
    } else if (!Handler.baseSaveGameId) {
      throw new Error("Cannot create saveGame");
    }
    return deepmerge(Handler.baseSaveGameId, userSaveGame);
  }

  private static async getAuthenticatedEpicUserId(
    request: Request<LoginRequest>
  ) {
    const token = request.header("Authorization")?.split(" ")[1];
    if (!token) {
      return null;
    }
    try {
      if (!Handler.epicKeys || Handler.epicKeys.length === 0) {
        const epicResponse = await (
          await fetch("https://api.epicgames.dev/auth/v1/oauth/jwks")
        ).json();
        Handler.epicKeys = epicResponse.keys.map((key: any) => jwt_to_pem(key));
      }
    } catch (e) {
      return null;
    }
    let parsedToken: JwtPayload | undefined;
    for (let i = 0; i < Handler.epicKeys.length && !parsedToken; i++) {
      try {
        parsedToken = jwt.verify(token, Handler.epicKeys[i], {}) as JwtPayload;
      } catch (e) {}
    }
    if (!parsedToken) {
      return process.argv.includes("--allowNonEpicUsers")
        ? Handler.getUnAuthenticatedEpicId(request)
        : null;
    }
    const epicId = parsedToken.sub;
    const currentTime = Date.now() / 1000;
    if (!epicId || !parsedToken.exp || parsedToken.exp < currentTime) {
      Logger.log("Ilegal token");
      return null;
    }
    return epicId;
  }

  private static getUnAuthenticatedEpicId(request: Request<LoginRequest>) {
    const token = request.header("Authorization")?.split(" ")[1];
    if (!token) {
      return null;
    }
    const parsedToken = jwt.decode(token);
    let epicId: string | null;
    switch (typeof parsedToken?.sub) {
      case "string":
        epicId = "unsafe-" + parsedToken.sub;
        break;
      case "function":
        epicId = "unsafe-" + parsedToken.sub();
        break;
      default:
        epicId = null;
    }
    return epicId;
  }

  /**
   * Get info that's general for the whole server, not of an specific user
   *  */
  private static async getGeneralServerInfo(): Promise<
    Partial<SaveGameResponse>
  > {
    const collection = db.collection<ServerInfo>(Collections.SERVER_INFO);
    const event = (await collection.findOneAsync({})).currentEvent;
    return {
      data: { DDT_SeasonalEventBit: { activeSeasonalEventTypes: [event] } },
    };
  }

  private static generateToken(id: string) {
    return jwt.sign(id, db.token);
  }
}
