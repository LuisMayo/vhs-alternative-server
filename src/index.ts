import "reflect-metadata";

import {
  EMPTY_SUCCESFUL_RESPONSE,
  LoginRequest,
  LoginResponse,
} from "./types/vhs-the-game-types";
import express, { NextFunction, Request, Response } from "express";

import { Database } from "./classes/database";
import { Handler } from "./classes/handler";
import fs from "fs";
import https from "https";
import morgan from "morgan";

export let db: Database;

process.on('unhandledRejection', (reason: string, p: Promise<unknown>) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

function initApp() {
  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  db = new Database();
  db.init()
    .then((initDb) => {
      initServer();
    })
    .catch((error) => console.log(error));
}

function initServer() {
  const app = express();
  const port = 3000;
  // Base URL as it's going to be edited in the game
  // const baselineUrl = "/api00000000000000000000";
  // // Final URL as it's going to be called
  // const baseUrl = baselineUrl + "/Client/";
  const baseUrls = ["/metagame/THEEND_GAME/Client/", "/vhs-api/Client/"];

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(
    (err: any, req: Request, res: Response, _next: NextFunction): void => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    }
  );
  app.post(
    [
      ...baseUrls.map((route) => route + "Login"),
      ...baseUrls.map((route) => route + "ReplaceExistingSessionToken"),
    ],
    (req: Request<any, LoginResponse | string, LoginRequest>, res) => {
      console.log(req.body);
      Handler.wrapper(req, res, Handler.login);
    }
  );
  app.post(
    baseUrls.map((route) => route + "Discover"),
    (req, res) => {
      Handler.wrapper(req, res, Handler.discover);

    }
  );
  app.post(
    baseUrls.map((route) => route + "UseCustomLobby"),
    (req, res) => {
      Handler.wrapper(req, res, Handler.lobby);

    }
  );
  app.post(
    baseUrls.map((route) => route + "SetCharacterLoadout"),
    (req, res) => {
      Handler.wrapper(req, res, Handler.setCharacterLoadout);

    }
  );
  app.post(
    baseUrls.map((route) => route + "SetWeaponLoadoutsForCharacter"),
    (req, res) => {
      Handler.wrapper(req, res, Handler.setCharacterWeapon);

    }
  );
  app.post(
    baseUrls.map((route) => route + "UploadPlayerSettings"),
    (req, res) => {
      Handler.wrapper(req, res, Handler.setCharacterSettings);

    }
  );
  app.post(
    baseUrls.map((route) => route + "SetPlayerSlots"),
    (req, res) => {
      Handler.wrapper(req, res, Handler.setCharacterSlots);
    }
  );

  app.post("*", (req, res) => {
    console.log("UNKOWN REQUEST");
    console.log(req.body);
    res.send(EMPTY_SUCCESFUL_RESPONSE);
  });
  app.get("/", (req, res) => res.send("HEY!"));
  if (!process.argv.some((arg) => arg === "--disableRealPort")) {
    https
      .createServer(
        {
          cert: fs.readFileSync("vhsgame.com.crt"),
          key: fs.readFileSync("vhsgame.com.pem"),
        },
        app
      )
      .listen(443, "0.0.0.0", () => {});
  }
app.listen(12478);
}

initApp();
