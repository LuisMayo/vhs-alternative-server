import { WebSocket, WebSocketServer } from "ws";
import {
  HeartBeatRequest,
  HeartbeatResponse,
  LoginRequest,
  MatchmagingNotification,
  WSRequest,
  WSResponse,
} from "./types";
import { Handler } from "../classes/handler";
import { Logger } from "../classes/logger";

const wss = new WebSocketServer({ port: 12479 });

wss.on("connection", function connection(ws) {
  let id: string;
  ws.on("error", console.error);
  ws.on("close", () => WSClientManager.removeClient(ws));

  ws.on("message", function message(data) {
    const msg = data.toString("utf-8");
    let parsedMsg: WSRequest = { action: "" };
    try {
      parsedMsg = JSON.parse(msg);
    } catch (e) {
      console.error(e);
    }

    switch (parsedMsg.action) {
      case "OnLogin":
        id = Handler.getId(parsedMsg.sessionTicketId);
        WSClientManager.addNewClient(ws, id);
        break;
      case "OnHeartbeat":
        const hbResponse: HeartbeatResponse = {
          action: "Heartbeat",
          backendError: 0,
          data: "",
          extraMessage: "",
          result: true,
        };
        ws.send(JSON.stringify(hbResponse));
        break;
      case "OnQueueAs":
        // TODO DISCORD INTEGRATION AND NAME SAVING LOGIC
        const matchMakingNotification: MatchmagingNotification = {
          action: "MatchmakingNotification",
          backendError: null,
          result: true,
          extraMessage: "",
          data: {
            matchmakingType: "MatchmakingSearching",
            players: [{ playerAccountId: id }],
            serverIp: "",
            serverPort: 0,
          },
        };
        ws.send(JSON.stringify(matchMakingNotification));
        break;
      default:
        Logger.log("Unknown request", msg);
    }
  });
});

export class WSClientManager {
  private static clients: { ws: WebSocket; userId: string }[] = [];

  public static addNewClient(ws: WebSocket, userId: string) {
    WSClientManager.clients.push({ ws, userId });
  }

  public static removeClient(ws: WebSocket) {
    const idx = WSClientManager.clients.findIndex((client) => client.ws === ws);
    WSClientManager.clients.splice(idx, 1);
  }
}
