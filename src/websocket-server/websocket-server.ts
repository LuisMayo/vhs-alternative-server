import { WebSocket, WebSocketServer } from 'ws';
import { HeartBeatRequest, LoginRequest, WSRequest, WSResponse } from './types';
import { Handler } from '../classes/handler';
import { Logger } from '../classes/logger';

const wss = new WebSocketServer({ port: 12479 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  ws.on("close", () => WSClientManager.removeClient(ws));

  ws.on('message', function message(data) {
    const msg = data.toString('utf-8');
    let parsedMsg: WSRequest = {action: ''};
    try{
      parsedMsg = JSON.parse(msg);
    } catch (e) {
      console.error(e);
    }

    switch (parsedMsg.action) {
      case 'OnLogin':
        const typedMsg = parsedMsg as LoginRequest;
        WSClientManager.addNewClient(ws, Handler.getId(typedMsg.sessionTicketId));
        break;
      case 'OnHeartbeat':
        const obj: WSResponse = {
          action: 'Heartbeat',
          backendError: 0,
          data: '',
          extraMessage: '',
          result: true
        };
        ws.send(JSON.stringify(obj));
      default:
        Logger.log('Unknown request', msg);
    }
  });
});


export class WSClientManager {
    private static clients: {ws: WebSocket, userId: string}[] = [];

    public static addNewClient(ws: WebSocket, userId: string) {
        WSClientManager.clients.push({ws, userId});
    }

    public static removeClient(ws: WebSocket) {
        const idx = WSClientManager.clients.findIndex(client => client.ws === ws);
        WSClientManager.clients.splice(idx, 1);
    }
}