/* Request is used for any Client-> Server communication
 while response is used for any Server-Client communication, independently of who is actually starting it
*/
export type WSRequest =
  | LoginRequest
  | QueueRequest
  | HeartBeatRequest
  | { action: "" };

export interface HeartBeatRequest {
  action: "OnHeartbeat";
}

export interface LoginRequest {
  action: "OnLogin";
  gameClientGuid: string;
  clientBuildNumber: `${number}`;
  sessionTicketId: string;
  playerAccountId: string;
  cloudScriptVersion: number;
}

export interface QueueRequest {
  action: "OnQueueAs";
  readonly matchmakingStatus: string;
  readonly matchmakingRegion: string;
  readonly gameClientGuid: string;
  readonly playerAccountId: string;
  readonly displayName: string;
  readonly preferredFaction: string;
  readonly partyId: string;
  readonly partyMemberPlayerAccountIds: number[];
  readonly characterType: string;
  readonly matchmakingTicketId: string;
  readonly matchId: string;
  readonly dsIpAddress: string;
  readonly dsPort: number;
}

export type WSResponse = HeartbeatResponse | MatchmagingNotification;
export interface HeartbeatResponse {
  action: "Heartbeat";
  result: boolean;
  backendError: number;
  extraMessage: string;
  data: string;
}

export interface MatchmagingNotification {
  readonly action: "MatchmakingNotification";
  readonly result: boolean;
  readonly backendError: null;
  readonly extraMessage: string;
  readonly data: Data;
}

export interface Data {
  readonly matchmakingType: 'MatchmakingSearching';
  readonly serverIp: string;
  readonly serverPort: number;
  readonly players: Player[];
}

export interface Player {
  readonly playerAccountId: string;
}
