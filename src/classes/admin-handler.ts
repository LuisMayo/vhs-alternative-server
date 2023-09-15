import { Request, Response } from "express";

import { Collections } from "./database";
import { DBConstants } from "./constants";
import { Logger } from "./logger";
import { db } from "..";
import { readFile } from "fs/promises";

export class AdminHandler {
  static lastMessage = "";
  static async adminDashboard(request: Request, response: Response<string>) {
    let html = await readFile("./data/frontend/index.html", {
      encoding: "utf-8",
    });
    html = html.replace("${lastMessage}", AdminHandler.lastMessage);
    html = html.replace("${log}", Logger.getLogListHtml());
    response.send(html);
  }

  static async removeUserSaveGame(req: Request, response: Response) {
    if (req.body.userId) {
      const collection = db.collection(Collections.SAVE_GAME);
      try {
          const number = await collection.removeAsync({ [DBConstants.userIdField]: req.body.userId }, { multi: false });
          AdminHandler.lastMessage = `Removed ${number} users`;
      } catch(e) {
        AdminHandler.lastMessage = 'Error while removing user ' + e;
      }
    } else {
        AdminHandler.lastMessage = 'No user specified';
    }
    // response.redirect(204, '/vhs-admin?timestamp');
    AdminHandler.adminDashboard(req, response);
  }
}
