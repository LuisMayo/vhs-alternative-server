import express, { Request } from "express";
import https from "https";
import http from "http";
import fs from "fs";
import { LoginRequest, LoginResponse } from "./types/vhs-the-game-types";
import { LoginHandler } from "./classes/dummy-login";
const app = express();
const port = 3000;
const baseUrl = '/metagame/THEEND_GAME/Client/';

app.use(express.json());
app.post(baseUrl + "Login", (req: Request<any, LoginResponse, LoginRequest>, res) => {
  const response = new LoginHandler(req.body);
  res.send(response);
});
app.get('/', (req, res) => res.send("HEY!"));

https
  .createServer(
    {
      key: fs.readFileSync("vhsgame.com.pem"),
      cert: fs.readFileSync("vhsgame.com.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log("aaaaa...");
  });
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
