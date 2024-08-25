import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import https from "https";
import morgan from "morgan";
import basicAuth from "express-basic-auth";

import { EMPTY_SUCCESFUL_RESPONSE, LoginRequest, LoginResponse } from "./types/vhs-the-game-types";
import { AdminHandler } from "./classes/admin-handler";
import { Database } from "./classes/database";
import { Handler } from "./classes/handler";
import { Logger } from "./classes/logger";
import { LobbyManager } from "./classes/lobby-manager";

export let db: Database;

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: string, p: Promise<unknown>) => {
  Logger.log("Unhandled Rejection at: " + p, "reason: " + reason);
});

// Initialize the application
function initApp() {
  db = new Database();
  db.init()
    .then(() => initServer())
    .catch((error) => Logger.log('Database initialization failed', error.message));
}

// Initialize the server
function initServer() {
  const app = express();
  
  // Set up logging
  app.use(morgan("dev"));

  // Set up routers
  setupVHSRouter(app);
  setupAdminRouter(app);

  // Start the HTTPS server if applicable
  if (!process.argv.includes("--disableRealPort")) {
    const httpsOptions = {
      cert: fs.readFileSync("vhsgame.com.crt"),
      key: fs.readFileSync("vhsgame.com.pem"),
    };
    https.createServer(httpsOptions, app)
      .listen(443, "0.0.0.0", () => Logger.log('HTTPS server running on port 443'));
  }

  // Start the HTTP server
  app.listen(12478, () => Logger.log('HTTP server running on port 12478'));

  // Periodically clear inactive lobbies
  setInterval(LobbyManager.clearInactiveLobbies, 1 * 60 * 60 * 1000);
}

// Set up VHS API routes
function setupVHSRouter(app: express.Application) {
  const baseUrls = ["/metagame/THEEND_GAME/Client", "/vhs-api/Client"];
  const vhsRouter = express.Router();
  
  vhsRouter.use(express.json());
  vhsRouter.post("/Login", (req: Request<any, LoginResponse | string, LoginRequest>, res) => {
    Handler.wrapper(req, res, Handler.login);
  });
  vhsRouter.post("/ReplaceExistingSessionToken", (req, res) => {
    res.sendStatus(500); // Not implemented
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
    Logger.log("Unknown request", req.url);
    Logger.log(req.body);
    res.send(EMPTY_SUCCESFUL_RESPONSE);
  });
  
  app.use(baseUrls, vhsRouter);
}

// Set up Admin API routes
function setupAdminRouter(app: express.Application) {
  const adminRouter = express.Router();
  
  adminRouter.use(express.urlencoded({ extended: false }));
  adminRouter.get("/", (req, res) => {
    Handler.wrapper(req, res, AdminHandler.adminDashboard);
  });
  adminRouter.post("/remove-user", (req, res) => {
    Handler.wrapper(req, res, AdminHandler.removeUserSaveGame);
  });
  adminRouter.post("/impersonate-user", (req, res) => {
    Handler.wrapper(req, res, AdminHandler.impersonateUser);
  });
  adminRouter.post("/change-event", (req, res) => {
    Handler.wrapper(req, res, AdminHandler.updateEvent);
  });

  if (process.argv.includes('--disableAdminPassword')) {
    app.use("/vhs-admin", adminRouter);
  } else {
    app.use("/vhs-admin", basicAuth({
      users: { user: process.env["VHS-PASSWORD"] ?? "password" },
      challenge: true,
    }), adminRouter);
  }
}

// Start the application
initApp();
