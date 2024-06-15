import { VHSResponse } from "./vhs-the-game-types";

export interface CreateLobbyRequest {
    action?: 'createLobby';
    connectionString?: string;
    sessionTicketId?: string;
    version?: number;
    idpk?: string;
}

export interface JoinLobbyRequest {
    action?: 'joinLobby';
    lobbyCode?: string;
    sessionTicketId?: string;
    version?: number;
    idpk?: string;
}

export interface CloseLobbyRequest {
    action?: 'closeLobby';
    lobbyData: {
        beaconPort: number,
        closeReason: string,
        levelType: number,
        lobbyName: string,
        numEvils: number,
        numTeens: number
    },
    matchSettings: {
        selectedMap: string
    },
    sessionTicketId?: string;
    version?: number;
    idpk?: string;
}

export type UseCustomLobbyRequest = CreateLobbyRequest | JoinLobbyRequest | CloseLobbyRequest;

export type CreateLobbyResponse = VHSResponse<CreateLobbyData>;

export interface CreateLobbyData {
    lobbyCode?: string;
}

export type JoinLobbyResponse = VHSResponse<JoinLobbyData>;

export interface JoinLobbyData {
    lobbyFound?: boolean;
    connectionString?: string;
    discoverKey?: string;
}
export type UseCustomLobbyResponse = CreateLobbyResponse | JoinLobbyResponse | VHSResponse<void>;
