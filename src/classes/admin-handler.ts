import { Request, Response } from "express";

import { DBConstants } from "./constants";
import { Logger } from "./logger";
import { SeasonalEvents } from "../types/save-game";
import { ServerInfo } from "../types/server-info";
import { readFile } from "fs/promises";
import { Database } from "./database";
import { Collections } from "./database-shim";
import { Collection } from "mongodb";

export class AdminHandler {
  static impersonationInfo = new Map<string, string>();
  static async adminDashboard(
    request: Request,
    response: Response<string>,
    msg?: string
  ) {
    let html = await readFile("./data/frontend/index.html", {
      encoding: "utf-8",
    });
    html = html
      .replace("${lastMessage}", msg ?? "")
      .replace("${log}", Logger.getLogListHtml())
      .replace("${events}", await AdminHandler.getEventsSelect());
    response.send(html);
  }

  static async removeUserSaveGame(req: Request, response: Response) {
    let msg = "";
    if (req.body.userId) {
      try {
        const number = await Database.db.remove(Collections.SAVE_GAME, {
          [DBConstants.userIdField]: req.body.userId,
        });
        msg = `Removed ${number} users`;
      } catch (e) {
        msg = "Error while removing user " + e;
      }
    } else {
      msg = "No user specified";
    }
    // response.redirect(204, '/vhs-admin?timestamp');
    AdminHandler.adminDashboard(req, response, msg);
  }

  static async impersonateUser(req: Request, response: Response) {
    if (req.body.admin && req.body.userId) {
      AdminHandler.impersonationInfo.set(req.body.admin, req.body.userId);
      AdminHandler.adminDashboard(req, response, "Impersonation registered");
    } else {
      AdminHandler.impersonationInfo.clear();
      AdminHandler.adminDashboard(req, response, "Impersonations cleared");
    }
  }

  static async updateEvent(req: Request, response: Response) {
    if (req.body.event) {
      await Database.db.update(
        Collections.SERVER_INFO,
        {},
        { $set: { currentEvent: req.body.event } }
      );
      AdminHandler.adminDashboard(req, response, "Event set");
    } else {
      AdminHandler.adminDashboard(req, response, "Event empty");
    }
  }

  static getImpersonatedId(id: string) {
    return AdminHandler.impersonationInfo.get(id) ?? id;
  }

  private static async getEventsSelect() {
    const currentEvent = (await Database.db.findOne<ServerInfo>(
      Collections.SERVER_INFO,
      {}
    ))!.currentEvent;
    let html = "";
    for (const event of Object.values(SeasonalEvents)) {
      html += `<option value="${event}" ${
        currentEvent === event ? "selected" : ""
      }>${event}</option>\n`;
    }
    return html;
  }
}
