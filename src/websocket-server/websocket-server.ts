import { WebSocket, WebSocketServer } from 'ws';
import { HeartBeatRequest, LoginRequest, WSRequest, WSResponse } from './types';
import { Handler } from '../classes/handler';
import { Logger } from '../classes/logger';

const PORT = 12479;
const wss = new WebSocketServer({ port: PORT });

// Log when the server starts listening
Logger.log(`WebSocket server is listening on port ${PORT}`);

// Handle new WebSocket connections
wss.on('connection', (ws) => {
  Logger.log('New client connected');

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
  ws.on('message', (data) => {
    const msg = data.toString('utf-8');
    let parsedMsg: WSRequest;

    try {
      parsedMsg = JSON.parse(msg);
    } catch (e) {
      Logger.log('Failed to parse message', (e as Error).message);
      ws.send(JSON.stringify(createErrorResponse('Invalid JSON format')));
      return;
    }

    // Process message based on action
    handleMessage(ws, parsedMsg);
  });
});

/**
 * Handles incoming WebSocket messages based on the action specified.
 */
function handleMessage(ws: WebSocket, parsedMsg: WSRequest) {
  switch (parsedMsg.action) {
    case 'OnLogin': {
      if (!isLoginRequest(parsedMsg)) {
        Logger.log('Invalid login request format', JSON.stringify(parsedMsg));
        ws.send(JSON.stringify(createErrorResponse('Invalid login request format')));
        return;
      }

      const userId = Handler.getId(parsedMsg.sessionTicketId);
      WSClientManager.addNewClient(ws, userId);
      Logger.log('Client logged in', userId);
      break;
    }
    case 'OnHeartbeat': {
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
    }
    default: {
      Logger.log('Unknown request', JSON.stringify(parsedMsg));
      ws.send(JSON.stringify(createErrorResponse('Unknown action')));
      break;
    }
  }
}

/**
 * Checks if the message is a valid LoginRequest.
 */
function isLoginRequest(msg: WSRequest): msg is LoginRequest {
  return msg.action === 'OnLogin' && 'sessionTicketId' in msg;
}

/**
 * Creates a generic error response.
 */
function createErrorResponse(extraMessage: string): WSResponse {
  return {
    action: 'Heartbeat',
    backendError: 1,
    data: '',
    extraMessage,
    result: false
  };
}

export class WSClientManager {
  private static clients: { ws: WebSocket; userId: string }[] = [];

  // Add a new client
  public static addNewClient(ws: WebSocket, userId: string) {
    WSClientManager.clients.push({ ws, userId });
    Logger.log('New client added', userId);
  }

  // Remove a client
  public static removeClient(ws: WebSocket) {
    const idx = WSClientManager.clients.findIndex((client) => client.ws === ws);
    if (idx !== -1) {
      const [removedClient] = WSClientManager.clients.splice(idx, 1);
      Logger.log('Client removed', removedClient.userId);
    }
  }
}
