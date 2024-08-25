import { Request, Response } from "express";
import { Collections } from "./database";
import { DBConstants } from "./constants";
import { Logger } from "./logger";
import { SeasonalEvents } from "../types/save-game";
import { ServerInfo } from "../types/server-info";
import { db } from "..";
import { readFile } from "fs/promises";

export class AdminHandler {
  static impersonationInfo = new Map<string, string>();

  static async adminDashboard(request: Request, response: Response<string>, msg?: string) {
    try {
      let html = await readFile("./data/frontend/index.html", { encoding: "utf-8" });
      html = html.replace("${lastMessage}", msg ?? '')
        .replace("${log}", Logger.getLogListHtml())
        .replace("${events}", await AdminHandler.getEventsSelect());
      response.send(html);
    } catch (error) {
      Logger.error("Failed to load admin dashboard: " + error.message);
      response.status(500).send("Internal Server Error");
    }
  }

  static async removeUserSaveGame(req: Request, response: Response) {
    let msg = '';
    if (req.body.userId) {
      const collection = db.collection(Collections.SAVE_GAME);
      try {
        const result = await collection.deleteOne({ [DBConstants.userIdField]: req.body.userId });
        msg = `Removed ${result.deletedCount} user(s)`;
      } catch (e) {
        msg = 'Error while removing user ' + e;
        Logger.error("Error in removeUserSaveGame: " + e.message);
      }
    } else {
      msg = 'No user specified';
    }
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

  static async updateEvent(req: Request, response: Response) {
    if (req.body.event) {
      try {
        await db.collection(Collections.SERVER_INFO).updateOne({}, { $set: { currentEvent: req.body.event } });
        AdminHandler.adminDashboard(req, response, 'Event set');
      } catch (e) {
        Logger.error("Error in updateEvent: " + e.message);
        AdminHandler.adminDashboard(req, response, 'Failed to set event');
      }
    } else {
      AdminHandler.adminDashboard(req, response, 'Event empty');
    }
  }

  static getImpersonatedId(id: string) {
    return AdminHandler.impersonationInfo.get(id) ?? id;
  }

  private static async getEventsSelect() {
    try {
      const currentEvent = (await db.collection<ServerInfo>(Collections.SERVER_INFO).findOne({})).currentEvent;
      let html = '';
      for (const event of Object.values(SeasonalEvents)) {
        html += `<option value="${event}" ${currentEvent === event ? 'selected' : ''}>${event}</option>\n`;
      }
      return html;
    } catch (error) {
      Logger.error("Failed to get events for select: " + error.message);
      return '<option value="">Error loading events</option>';
    }
  }
}
