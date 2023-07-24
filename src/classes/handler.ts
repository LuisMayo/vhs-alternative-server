import {
  Log,
  LoginData,
  LoginRequest,
  LoginRequestToken,
  LoginResponse,
} from "../types/vhs-the-game-types";
import { Request, Response } from "express";

import { User } from "../database/database.interface";
import jwt_decode from "jwt-decode";

export class Handler {
  static async login(
    request: Request<LoginRequest>,
    response: Response<LoginResponse | string>
  ) {
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
    let existingUser = await User.findOneBy({ epicId });
    if (!existingUser) {
      // TODO do we need to call EOS or Steam to get the Display Name? :(
      existingUser = User.create({ displayName: "Dummy", epicId });
      await existingUser.save();
    }
    response.send({
      data: { displayName: existingUser.displayName, playerAccountId: existingUser.ownId, sessionTicketId: 'dummy' },
      log: { logSuccessful: true },
    });
    console.log();
  }
}
