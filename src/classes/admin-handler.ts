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

  static async adminDashboard(request: Request, response: Response<string>, msg: string = '') {
    try {
      let html = await readFile("./data/frontend/index.html", { encoding: "utf-8" });
      html = html.replace("${lastMessage}", msg)
        .replace("${log}", Logger.getLogListHtml())
        .replace("${events}", await AdminHandler.getEventsSelect());
      response.send(html);
    } catch (error) {
      Logger.error("Failed to load admin dashboard: " + (error instanceof Error ? error.message : error));
      response.status(500).send("Internal Server Error");
    }
  }

  static async removeUserSaveGame(req: Request, response: Response) {
    let msg = '';
    if (typeof req.body.userId === 'string') {
      const collection = db.collection(Collections.SAVE_GAME);
      try {
        // Method for Nedb
        collection.remove({ [DBConstants.userIdField]: req.body.userId }, { multi: false }, (err, numRemoved) => {
          if (err) {
            msg = 'Error while removing user: ' + err.message;
            Logger.error("Error in removeUserSaveGame: " + err.message);
          } else {
            msg = `Removed ${numRemoved} user(s)`;
          }
          AdminHandler.adminDashboard(req, response, msg);
        });
      } catch (e) {
        msg = 'Error while removing user: ' + (e instanceof Error ? e.message : e);
        Logger.error("Error in removeUserSaveGame: " + (e instanceof Error ? e.message : e));
        AdminHandler.adminDashboard(req, response, msg);
      }
    } else {
      msg = 'No user specified';
      AdminHandler.adminDashboard(req, response, msg);
    }
  }

  static async impersonateUser(req: Request, response: Response) {
    if (typeof req.body.admin === 'string' && typeof req.body.userId === 'string') {
      AdminHandler.impersonationInfo.set(req.body.admin, req.body.userId);
      AdminHandler.adminDashboard(req, response, 'Impersonation registered');
    } else if (typeof req.body.admin === 'string') {
      AdminHandler.impersonationInfo.delete(req.body.admin);
      AdminHandler.adminDashboard(req, response, 'Impersonation cleared');
    } else {
      AdminHandler.adminDashboard(req, response, 'Invalid admin or userId');
    }
  }

  static async updateEvent(req: Request, response: Response) {
    if (typeof req.body.event === 'string') {
      try {
        db.collection(Collections.SERVER_INFO).update({}, { $set: { currentEvent: req.body.event } }, {}, (err) => {
          if (err) {
            Logger.error("Error in updateEvent: " + err.message);
            AdminHandler.adminDashboard(req, response, 'Failed to set event');
          } else {
            AdminHandler.adminDashboard(req, response, 'Event set');
          }
        });
      } catch (e) {
        Logger.error("Error in updateEvent: " + (e instanceof Error ? e.message : e));
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
      const serverInfo = await new Promise<ServerInfo>((resolve, reject) => {
        db.collection<ServerInfo>(Collections.SERVER_INFO).findOne({}, (err, doc) => {
          if (err) {
            reject(err);
          } else {
            resolve(doc || { currentEvent: '' });
          }
        });
      });

      const currentEvent = serverInfo.currentEvent || '';
      let html = '';
      for (const event of Object.values(SeasonalEvents)) {
        html += `<option value="${event}" ${currentEvent === event ? 'selected' : ''}>${event}</option>\n`;
      }
      return html;
    } catch (error) {
      Logger.error("Failed to get events for select: " + (error instanceof Error ? error.message : error));
      return '<option value="">Error loading events</option>';
    }
  }
}
