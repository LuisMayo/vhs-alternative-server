import "reflect-metadata";

import { LoginRequest, LoginResponse } from "./types/vhs-the-game-types";
import express, { Request } from "express";

import { DataSource } from "typeorm";
import { Handler } from "./classes/handler";
import { User } from "./database/database.interface";
import fs from "fs";
import http from "http";
import https from "https";
import morgan from 'morgan';

function initDatabase() {
  const AppDataSource = new DataSource({
    type: "sqlite",
    database: "test.db",
    entities: [User],
    synchronize: true,
    logging: true,
  });

  // to initialize initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  AppDataSource.initialize()
    .then(() => {
      initServer();
    })
    .catch((error) => console.log(error));
}

function initServer() {
  const app = express();
  const port = 3000;
  const baseUrl = "/metagame/THEEND_GAME/Client/";

  app.use(express.json());
  app.use(morgan('dev'));
  app.post(
    baseUrl + "Login",
    (req: Request<any, LoginResponse | string, LoginRequest>, res) => {
      console.log("a")
      Handler.login(req, res);
    }
  );
  app.get("/", (req, res) => res.send("HEY!"));

  https
    .createServer(
      {
        key: fs.readFileSync("vhsgame.com.pem"),
        cert: fs.readFileSync("vhsgame.com.crt"),
      },
      app
    )
    .listen(443, '0.0.0.0', () => {
      console.log("aaaaa...");
    });
}


initDatabase();