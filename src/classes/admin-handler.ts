import { Request, Response } from "express";

import { Collections } from "./database";
import { DBConstants } from "./constants";
import { Logger } from "./logger";
import { db } from "..";
import { readFile } from "fs/promises";

export class AdminHandler {
  static impersonationInfo = new Map<string, string>();
  static async adminDashboard(request: Request, response: Response<string>, msg?: string) {
    let html = await readFile("./data/frontend/index.html", {
      encoding: "utf-8",
    });
    html = html.replace("${lastMessage}", msg ?? '');
    html = html.replace("${log}", Logger.getLogListHtml());
    response.send(html);
  }

  static async removeUserSaveGame(req: Request, response: Response) {
      let msg = '';
    if (req.body.userId) {
      const collection = db.collection(Collections.SAVE_GAME);
      try {
          const number = await collection.removeAsync({ [DBConstants.userIdField]: req.body.userId }, { multi: false });
          msg = `Removed ${number} users`;
      } catch(e) {
        msg = 'Error while removing user ' + e;
      }
    } else {
        msg = 'No user specified';
    }
    // response.redirect(204, '/vhs-admin?timestamp');
    AdminHandler.adminDashboard(req, response, msg);
  }

  static async impersonateUser(req: Request, response: Response) {
    if (req.body.admin && req.body.userId) {
        AdminHandler.impersonationInfo.set(req.body.admin, req.body.userId);
        AdminHandler.adminDashboard(req, response, 'Impersonation registered');
    } else {
        AdminHandler.impersonationInfo.clear();
        AdminHandler.adminDashboard(req, response, 'Impersonations cleared');

    }
  }

  static getImpersonatedId(id: string) {
    return AdminHandler.impersonationInfo.get(id) ?? id;
  }
}
