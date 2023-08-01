import {
  DiscoverRequest,
  DiscoverTypes,
  LoginRequest,
  LoginRequestToken,
  LoginResponse,
  MathmakingInfoResponse,
} from "../types/vhs-the-game-types";
import { Request, Response } from "express";

import { DBConstants } from "./constants";
import { OptionalId } from "mongodb";
import { SaveGameResponse } from "../types/save-game";
import { User } from "../database/database.interface";
import { db } from "..";
import jwt_decode from "jwt-decode";
import { CreateLobbyRequest, CreateLobbyResponse, JoinLobbyResponse, UseCustomLobbyRequest, UseCustomLobbyResponse } from "../types/custom-lobby-types";
import randomstring from 'randomstring';

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
      // TODO do we need to call EOS or Steam to get the Display Name? :(
      id = (
        await collection.insertOne({ displayName: name, epicId })
      ).insertedId.toHexString();
    }
    response.send({
      data: {
        displayName: name,
        playerAccountId: id,
        sessionTicketId: "dummy",
      },
      log: { logSuccessful: true },
    });
    console.log();
  }

  static async discover(
    request: Request<any, DiscoverResponse | string, DiscoverRequest>,
    response: Response<DiscoverResponse | string>
  ) {
    const id = this.checkOwnTokenAndGetId(request) ?? "Dummy";
    switch (request.body.bitsToDiscover) {
      case DiscoverTypes.MATCHMAKING_INFO:
        (response as Response<MathmakingInfoResponse>).send({
          data: { DDT_DynamicBountyRewardsBit: { lastEarnedBounty: 10, MR_EU_Central1: { bountiesByCharType: { CT_Werewolf: 999 } } } },
          log: { logSuccessful: true },
        });
        break;
      default:
        console.error("Unknown discover type", request.body.bitsToDiscover);
      case DiscoverTypes.INITIAL_LOAD:
        const collection = db.collection<SaveGameResponse>(
          DBConstants.saveGameCollection
        );
        let userSaveGame: OptionalId<SaveGameResponse> | null =
          await collection.findOne({
            [DBConstants.userIdField]: id,
          });
        if (!userSaveGame) {
          userSaveGame = await collection.findOne({
            [DBConstants.userIdField]: DBConstants.baseSaveGameId,
          });
          if (!userSaveGame) {
            return response.status(500).send("Cannot create saveGame");
          }
          delete userSaveGame._id;
          userSaveGame[DBConstants.userIdField] = id;
          collection.insertOne(userSaveGame);
        }
        return response.send(userSaveGame);
        break;
    }
  }
  static async lobby(
    request: Request<any, UseCustomLobbyResponse | string, UseCustomLobbyRequest>,
    response: Response<UseCustomLobbyResponse | string>
  ) {
    switch (request.body.action) {
      case "createLobby":
        let code: string;
        do {
          code = randomstring.generate({ capitalization: "uppercase", length: 4, readable: true });
        } while (this.roomMap.has(code));
        // TODO timeout to remove from map
        // Todo what if connectionStirng is not provided
        this.roomMap.set(code, request.body.connectionString!);
        console.log("Room code generated", code);
        (response as Response<CreateLobbyResponse>).send({ data: { lobbyCode: code }, log: { logSuccessful: true } });
        break;
      case "joinLobby":
        const connectionString = this.roomMap.get(request.body.lobbyCode!);
        if (connectionString) {
          (response as Response<JoinLobbyResponse>).send({ log: { logSuccessful: true }, data: { connectionString, discoverKey: "dummy", lobbyFound: true } });
        } else {
          (response as Response<JoinLobbyResponse>).send({ log: { logSuccessful: true }, data: { connectionString: "dummy", discoverKey: "dummy", lobbyFound: false } });
        }
        break;
    }
  }

  static checkOwnTokenAndGetId(req: Request<unknown>) {
    return req.header("Authorization")?.split(' ')[1];
  }
}
