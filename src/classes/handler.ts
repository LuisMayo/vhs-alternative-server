import {
  CharacterLoadoutsCTEvil,
  CharacterLoadoutsCTTeen,
  Monsters,
  SaveGameResponse,
  Teens,
} from "../types/save-game";
import {
  CharacterWeaponLoadout,
  DiscoverRequest,
  DiscoverTypes,
  EMPTY_SUCCESFUL_RESPONSE,
  LoginRequest,
  LoginRequestToken,
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
import {
  CreateLobbyRequest,
  CreateLobbyResponse,
  JoinLobbyResponse,
  UseCustomLobbyRequest,
  UseCustomLobbyResponse,
} from "../types/custom-lobby-types";
import { Request, Response } from "express";

import { Collections } from "./database";
import { DBConstants } from "./constants";
import { Document } from "@seald-io/nedb";
import { User } from "../database/database.interface";
import { db } from "..";
import jwt_decode from "jwt-decode";
import randomstring from "randomstring";

type DiscoverResponse = SaveGameResponse | MathmakingInfoResponse;

export class Handler {
  static roomMap = new Map<string, string>();

  static async login(
    request: Request<LoginRequest>,
    response: Response<LoginResponse | string>
  ) {
    const collection = db.collection<User>(Collections.USERS);
    const token = request.header("Authorization")?.split(" ")[1];
    if (!token) {
      return response.status(401).send("Token not found");
    }
    let parsedToken: LoginRequestToken;
    try {
      parsedToken = jwt_decode(token);
    } catch (e) {
      return response.status(401).send("Token malformed");
    }
    const epicId = parsedToken.sub;
    if (!epicId) {
      return response.status(401).send("Token malformed");
    }
    let existingUser = await collection.findOneAsync<Document<User>>({
      epicId,
    });
    let id: string;
    let name = "Dummy";
    if (existingUser) {
      // If it comes from database it always is going to have an ID
      id = existingUser._id;
    } else {
      id = (await collection.insertAsync({ displayName: name, epicId }))._id;
    }
    response.send({
      data: {
        displayName: name,
        playerAccountId: id,
        sessionTicketId: id,
      },
      log: { logSuccessful: true },
    });
    console.log();
  }

  static async discover(
    request: Request<any, DiscoverResponse | string, DiscoverRequest>,
    response: Response<DiscoverResponse | string>
  ) {
    const id = this.checkOwnTokenAndGetId(request);
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
          const userSaveGame = await this.getUserSaveGame(id);
          return response.send(userSaveGame);
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
    const id = this.checkOwnTokenAndGetId(request);
    const saveData = await this.getUserSaveGame(id);
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
    const id = this.checkOwnTokenAndGetId(request);
    const saveData = await this.getUserSaveGame(id);
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
    const id = this.checkOwnTokenAndGetId(request);
    const saveData = await this.getUserSaveGame(id);
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
    const id = this.checkOwnTokenAndGetId(request);
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
    switch (request.body.action) {
      case "createLobby":
        let code: string;
        do {
          code = randomstring.generate({
            capitalization: "uppercase",
            length: 5,
            readable: true,
          });
        } while (this.roomMap.has(code));
        // TODO timeout to remove from map
        // Todo what if connectionStirng is not provided
        this.roomMap.set(code, request.body.connectionString!);
        console.log("Room code generated", code);
        (response as Response<CreateLobbyResponse>).send({
          data: { lobbyCode: code },
          log: { logSuccessful: true },
        });
        break;
      case "joinLobby":
        const connectionString = this.roomMap.get(request.body.lobbyCode!);
        if (connectionString) {
          console.log("Room code found", request.body.lobbyCode);
          (response as Response<JoinLobbyResponse>).send({
            log: { logSuccessful: true },
            data: { connectionString, discoverKey: "dummy", lobbyFound: true },
          });
        } else {
          console.log("Room code NOT found", request.body.lobbyCode);
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
        console.log("Unkown custom lobby action", request.body.action);
        response.send(EMPTY_SUCCESFUL_RESPONSE as CreateLobbyResponse);
    }
  }

  static checkOwnTokenAndGetId(req: Request<unknown>) {
    return req.header("Authorization")?.split(" ")[1] ?? "Dummy";
  }

  static async getUserSaveGame(userId: string) {
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
}
