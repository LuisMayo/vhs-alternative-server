/* Request is used for any Client-> Server communication
 while response is used for any Server-Client communication, independently of who is actually starting it
*/
export interface WSRequest {
    action: '' | 'OnHeartbeat' | 'OnLogin';
}

export interface HeartBeatRequest extends WSRequest {
    action: 'OnHeartbeat';
}

export interface LoginRequest extends WSRequest {
    action: "OnLogin",
    gameClientGuid: string,
    clientBuildNumber: `${number}`,
    sessionTicketId: string,
    playerAccountId: string,
    cloudScriptVersion: number
}

export interface WSResponse {
    action: 'Heartbeat',
    result: boolean,
    backendError: number, 
    extraMessage: string,
    data: string
}