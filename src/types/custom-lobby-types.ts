import { VHSResponse } from "./vhs-the-game-types";

// Request to create a new lobby
export interface CreateLobbyRequest {
    action?: 'createLobby'; // Action type
    connectionString?: string; // Connection string for the lobby
    sessionTicketId?: string; // Session ticket identifier
    version?: number; // Version of the request
    idpk?: string; // Unique identifier for the request
}

// Request to join an existing lobby
export interface JoinLobbyRequest {
    action?: 'joinLobby'; // Action type
    lobbyCode?: string; // Code of the lobby to join
    sessionTicketId?: string; // Session ticket identifier
    version?: number; // Version of the request
    idpk?: string; // Unique identifier for the request
}

// Request to close a lobby
export interface CloseLobbyRequest {
    action?: 'closeLobby'; // Action type
    lobbyData: {
        beaconPort: number; // Port number for the beacon
        closeReason: string; // Reason for closing the lobby
        levelType: number; // Type of level
        lobbyName: string; // Name of the lobby
        numEvils: number; // Number of EVIL players
        numTeens: number; // Number of TEEN players
    };
    matchSettings: {
        selectedMap: string; // Selected map for the match
    };
    sessionTicketId?: string; // Session ticket identifier
    version?: number; // Version of the request
    idpk?: string; // Unique identifier for the request
}

// Union type for custom lobby requests
export type UseCustomLobbyRequest = CreateLobbyRequest | JoinLobbyRequest | CloseLobbyRequest;

// Response for creating a new lobby
export type CreateLobbyResponse = VHSResponse<CreateLobbyData>;

// Data returned when creating a lobby
export interface CreateLobbyData {
    lobbyCode?: string; // Code of the created lobby
}

// Response for joining an existing lobby
export type JoinLobbyResponse = VHSResponse<JoinLobbyData>;

// Data returned when joining a lobby
export interface JoinLobbyData {
    lobbyFound?: boolean; // Indicates if the lobby was found
    connectionString?: string; // Connection string for the lobby
    discoverKey?: string; // Key for discovering the lobby
}

// Union type for custom lobby responses
export type UseCustomLobbyResponse = CreateLobbyResponse | JoinLobbyResponse | VHSResponse<void>;
