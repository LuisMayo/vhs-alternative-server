import "reflect-metadata";

import {
  EMPTY_SUCCESFUL_RESPONSE,
  LoginRequest,
  LoginResponse,
} from "./types/vhs-the-game-types";
import express, { NextFunction, Request, Response } from "express";

import { DBConstants } from "./classes/constants";
import { Database } from "./classes/database";
import { Handler } from "./classes/handler";
import fs from "fs";
import https from "https";
import morgan from "morgan";
import { readFile } from "fs/promises";

export let db: Database;

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
  const baseUrls = [
    "/metagame/THEEND_GAME/Client/",
    "/api00000000000000000000/",
  ];

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
      Handler.login(req, res);
    }
  );
  app.post(
    baseUrls.map((route) => route + "Discover"),
    (req, res) => {
      console.log("e");
      Handler.discover(req, res);
    }
  );
  app.post(
    baseUrls.map((route) => route + "UseCustomLobby"),
    (req, res) => {
      console.log("e");
      Handler.lobby(req, res);
    }
  );
  app.post(
    baseUrls.map((route) => route + "SetCharacterLoadout"),
    (req, res) => {
      console.log("e");
      Handler.setCharacterLoadout(req, res);
    }
  );
  app.post(
    baseUrls.map((route) => route + "SetWeaponLoadoutsForCharacter"),
    (req, res) => {
      console.log("e");
      Handler.setCharacterWeapon(req, res);
    }
  );
  app.post(
    baseUrls.map((route) => route + "UploadPlayerSettings"),
    (req, res) => {
      console.log("e");
      Handler.setCharacterSettings(req, res);
    }
  );
  app.post(
    baseUrls.map((route) => route + "SetPlayerSlots"),
    (req, res) => {
      Handler.setCharacterSlots(req, res);
    }
  );

  app.post("*", (req, res) => {
    console.log("UNKOWN REQUEST");
    console.log(req.body);
    res.send(EMPTY_SUCCESFUL_RESPONSE);
  });
  app.get("/", (req, res) => res.send("HEY!"));
  // https
  //   .createServer(
  //     {
  //       cert: fs.readFileSync("vhsgame.com.crt"),
  //       key: fs.readFileSync("vhsgame.com.pem"),
  //       // cert: fs.readFileSync("api.vhsgame.com.crt"),
  //       // key: fs.readFileSync("api.vhsgame.com.pem"),
  //     },
  //     app
  //   )
  //   .listen(443, "0.0.0.0", () => {});
  app.listen(12478);
}

initApp();
