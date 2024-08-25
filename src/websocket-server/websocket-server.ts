import { WebSocket, WebSocketServer } from 'ws';
import { HeartBeatRequest, LoginRequest, WSRequest, WSResponse } from './types';
import { Handler } from '../classes/handler';
import { Logger } from '../classes/logger';

const PORT = 12479;
const wss = new WebSocketServer({ port: PORT });

// Log when the server starts listening
Logger.log(`WebSocket server is listening on port ${PORT}`);

// Handle new WebSocket connections
wss.on('connection', function connection(ws) {
  // Handle errors
  ws.on('error', (error) => {
    Logger.log('WebSocket error', error.message);
  });

  // Handle client disconnection
  ws.on('close', () => {
    WSClientManager.removeClient(ws);
    Logger.log('Client disconnected');
  });

  // Handle incoming messages
  ws.on('message', function message(data) {
    const msg = data.toString('utf-8');
    let parsedMsg: WSRequest = { action: '' };
    
    try {
      parsedMsg = JSON.parse(msg);
    } catch (e) {
      Logger.log('Failed to parse message', msg);
      return;
    }

    switch (parsedMsg.action) {
      case 'OnLogin':
        const typedMsg = parsedMsg as LoginRequest;
        const userId = Handler.getId(typedMsg.sessionTicketId);
        WSClientManager.addNewClient(ws, userId);
        Logger.log('Client logged in', userId);
        break;
        
      case 'OnHeartbeat':
        const response: WSResponse = {
          action: 'Heartbeat',
          backendError: 0,
          data: '',
          extraMessage: '',
          result: true
        };
        ws.send(JSON.stringify(response));
        Logger.log('Heartbeat response sent');
        break;
        
      default:
        Logger.log('Unknown request', msg);
        break;
    }
  });
});

export class WSClientManager {
  private static clients: { ws: WebSocket, userId: string }[] = [];

  // Add a new client
  public static addNewClient(ws: WebSocket, userId: string) {
    WSClientManager.clients.push({ ws, userId });
    Logger.log('New client added', userId);
  }

  // Remove a client
  public static removeClient(ws: WebSocket) {
    const idx = WSClientManager.clients.findIndex(client => client.ws === ws);
    if (idx !== -1) {
      const [removedClient] = WSClientManager.clients.splice(idx, 1);
      Logger.log('Client removed', removedClient.userId);
    }
  }
}
