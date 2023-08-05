import {
  CharacterLoadoutsCTEvil,
  CharacterLoadoutsCTTeen,
  Monsters,
  SaveGameResponse,
  Teens,
} from "../types/save-game";
import {
  CreateLobbyRequest,
  CreateLobbyResponse,
  JoinLobbyResponse,
  UseCustomLobbyRequest,
  UseCustomLobbyResponse,
} from "../types/custom-lobby-types";
import {
  DiscoverRequest,
  DiscoverTypes,
  LoginRequest,
  LoginRequestToken,
  LoginResponse,
  MathmakingInfoResponse,
  SetCharacterLoadoutRequest,
  SetCharacterLoadoutResponse,
} from "../types/vhs-the-game-types";
import { Request, Response } from "express";

import { DBConstants } from "./constants";
import { OptionalId } from "mongodb";
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
    const collection = db.collection<User>("users");
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
    let existingUser = await collection.findOne({ epicId });
    let id: string;
    let name = "Dummy";
    if (existingUser) {
      id = existingUser._id.toHexString();
    } else {
      id = (
        await collection.insertOne({ displayName: name, epicId })
      ).insertedId.toHexString();
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
      .collection(DBConstants.saveGameCollection)
      .replaceOne({ [DBConstants.userIdField]: id }, saveData);
    return response.send({
      log: { logSuccessful: true },
      data: {
        changedSlotNames: Object.keys(request.body.loadoutChanges),
        characterLoadout: loadout,
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
    }
  }

  static checkOwnTokenAndGetId(req: Request<unknown>) {
    return req.header("Authorization")?.split(" ")[1] ?? "Dummy";
  }

  static async getUserSaveGame(userId: string) {
    const collection = db.collection<SaveGameResponse>(
      DBConstants.saveGameCollection
    );
    let userSaveGame: OptionalId<SaveGameResponse> | null =
      await collection.findOne({
        [DBConstants.userIdField]: userId,
      });
    if (!userSaveGame) {
      userSaveGame = await collection.findOne({
        [DBConstants.userIdField]: DBConstants.baseSaveGameId,
      });
      if (!userSaveGame) {
        throw new Error("Cannot create saveGame");
      }
      delete userSaveGame._id;
      userSaveGame[DBConstants.userIdField] = userId;
      collection.insertOne(userSaveGame);
    }
    return userSaveGame;
  }
}
