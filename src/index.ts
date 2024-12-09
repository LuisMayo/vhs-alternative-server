import "reflect-metadata";

import {
  EMPTY_SUCCESFUL_RESPONSE,
  LoginRequest,
  LoginResponse,
} from "./types/vhs-the-game-types";
import express, { NextFunction, Request, Response } from "express";

import { AdminHandler } from "./classes/admin-handler";
import { Database } from "./classes/database";
import { Handler } from "./classes/handler";
import { Logger } from "./classes/logger";
import basicAuth from "express-basic-auth";
import fs from "fs";
import https from "https";
import morgan from "morgan";
import { LobbyManager } from "./classes/lobby-manager";

process.on("unhandledRejection", (reason: string, p: Promise<unknown>) => {
  Logger.log("Unhandled Rejection at: " + p, "reason: " + reason);
});

function initApp() {
  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  Database.init()
    .then(() => {
      initServer();
    })
    .catch((error) => Logger.log(error));
}

function initServer() {
  const app = express();
  // Base URL as it's going to be edited in the game
  // const baselineUrl = "/api00000000000000000000";
  // // Final URL as it's going to be called
  // const baseUrl = baselineUrl + "/Client/";
  const baseUrls = ["/metagame/THEEND_GAME/Client", "/vhs-api/Client"];

  app.use(morgan("dev", {}));
  const vhsRouter = express.Router();
  vhsRouter.use(express.json());
  vhsRouter.post(
    "/Login",
    (req: Request<any, LoginResponse | string, LoginRequest>, res) => {
      Handler.wrapper(req, res, Handler.login);
    }
  );
  vhsRouter.post("/ReplaceExistingSessionToken", (req, res) => {
    res.sendStatus(500);
  });
  vhsRouter.post("/Discover", (req, res) => {
    Handler.wrapper(req, res, Handler.discover);
  });
  vhsRouter.post("/UseCustomLobby", (req, res) => {
    Handler.wrapper(req, res, Handler.lobby);
  });
  vhsRouter.post("/SetCharacterLoadout", (req, res) => {
    Handler.wrapper(req, res, Handler.setCharacterLoadout);
  });
  vhsRouter.post("/SetWeaponLoadoutsForCharacter", (req, res) => {
    Handler.wrapper(req, res, Handler.setCharacterWeapon);
  });
  vhsRouter.post("/UploadPlayerSettings", (req, res) => {
    Handler.wrapper(req, res, Handler.setCharacterSettings);
  });
  vhsRouter.post("/SetPlayerSlots", (req, res) => {
    Handler.wrapper(req, res, Handler.setCharacterSlots);
  });

  vhsRouter.post("*", (req, res) => {
    Logger.log("UNKOWN REQUEST", req.url);
    Logger.log(req.body);
    res.send(EMPTY_SUCCESFUL_RESPONSE);
  });
  app.use(baseUrls, vhsRouter);
  const adminRouter = express.Router();
  adminRouter.use(express.urlencoded({ extended: false }));
  adminRouter.get("/", (req, res) =>
    Handler.wrapper(req, res, AdminHandler.adminDashboard)
  );
  adminRouter.post("/remove-user", (req, res) =>
    Handler.wrapper(req, res, AdminHandler.removeUserSaveGame)
  );
  adminRouter.post("/impersonate-user", (req, res) =>
    Handler.wrapper(req, res, AdminHandler.impersonateUser)
  );
  adminRouter.post("/change-event", (req, res) =>
    Handler.wrapper(req, res, AdminHandler.updateEvent)
  );
  if(process.argv.includes('--disableAdminPassword')) {
    app.use(
      "/vhs-admin",
      adminRouter
    );
  } else {
    app.use(
      "/vhs-admin",
      basicAuth({
      users: { user: process.env["VHS-PASSWORD"] ?? "password" },
      challenge: true,
    }),
    adminRouter
  );
  }
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

  setInterval(LobbyManager.clearInactiveLobbies, 1 * 60 * 60 * 1000);
}

initApp();
