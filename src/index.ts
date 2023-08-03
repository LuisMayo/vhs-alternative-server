import "reflect-metadata";

import { LoginRequest, LoginResponse } from "./types/vhs-the-game-types";
import express, { Request } from "express";

import { DBConstants } from "./classes/constants";
import { Handler } from "./classes/handler";
import { MongoClient } from "mongodb";
import fs from "fs";
import https from "https";
import morgan from "morgan";
import { readFile } from "fs/promises";

const dbConnection = new MongoClient("mongodb://127.0.0.1");
export const db = dbConnection.db(DBConstants.databaseName);

function initApp() {
  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  dbConnection
    .connect()
    .then(() => {
      initMongoDB().then();
      initServer();
    })
    .catch((error) => console.log(error));
}

async function initMongoDB() {
  const baseJson = await db
    .collection(DBConstants.saveGameCollection)
    .findOne({ [DBConstants.userIdField]: DBConstants.baseSaveGameId });
  if (baseJson == null) {
    const base = JSON.parse(
      await readFile("./data/base.json", { encoding: "utf-8" })
    );
    base[DBConstants.userIdField] = DBConstants.baseSaveGameId;
    await db.collection(DBConstants.saveGameCollection).insertOne(base);
    await db.createIndex(
      DBConstants.saveGameCollection,
      DBConstants.userIdField
    );
  }
}

function initServer() {
  const app = express();
  const port = 3000;
  // Base URL as it's going to be edited in the game
  // const baselineUrl = "/api00000000000000000000";
  // // Final URL as it's going to be called
  // const baseUrl = baselineUrl + "/Client/";
  const baseUrls = ['/metagame/THEEND_GAME/Client/', '/api00000000000000000000/'];


  app.use(morgan("dev"));
  app.use(express.json());
  app.post(
    baseUrls.map(route => route + "Login"),
    (req: Request<any, LoginResponse | string, LoginRequest>, res) => {
      console.log("a");
      Handler.login(req, res);
    }
  );
  app.post(baseUrls.map(route => route + "Discover"), (req, res) => {
    console.log("e");
    Handler.discover(req, res);
  });
  app.post(baseUrls.map(route => route + "UseCustomLobby"), (req, res) => {
    console.log("e");
    Handler.lobby(req, res);
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
