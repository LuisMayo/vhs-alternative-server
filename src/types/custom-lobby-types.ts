import { VHSResponse } from "./vhs-the-game-types";

// Enum for lobby actions
export enum LobbyAction {
    CREATE = 'createLobby',
    JOIN = 'joinLobby',
    CLOSE = 'closeLobby',
}

// Request to create a new lobby
export interface CreateLobbyRequest {
    action: LobbyAction.CREATE; // Action type, should be required
    connectionString: string; // Connection string for the lobby, should be required
    sessionTicketId: string; // Session ticket identifier, should be required
    version: number; // Version of the request, should be required
    idpk: string; // Unique identifier for the request, should be required
}

// Request to join an existing lobby
export interface JoinLobbyRequest {
    action: LobbyAction.JOIN; // Action type, should be required
    lobbyCode: string; // Code of the lobby to join, should be required
    sessionTicketId: string; // Session ticket identifier, should be required
    version: number; // Version of the request, should be required
    idpk: string; // Unique identifier for the request, should be required
}

// Request to close a lobby
export interface CloseLobbyRequest {
    action: LobbyAction.CLOSE; // Action type, should be required
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
    sessionTicketId: string; // Session ticket identifier, should be required
    version: number; // Version of the request, should be required
    idpk: string; // Unique identifier for the request, should be required
}

// Union type for custom lobby requests
export type UseCustomLobbyRequest = CreateLobbyRequest | JoinLobbyRequest | CloseLobbyRequest;

// Response data for creating a new lobby
export interface CreateLobbyData {
    lobbyCode: string; // Code of the created lobby, should be required
}

// Response for creating a new lobby
export type CreateLobbyResponse = VHSResponse<CreateLobbyData>;

// Response data for joining an existing lobby
export interface JoinLobbyData {
    lobbyFound: boolean; // Indicates if the lobby was found, should be required
    connectionString?: string; // Connection string for the lobby, optional
    discoverKey?: string; // Key for discovering the lobby, optional
}

// Response for joining an existing lobby
export type JoinLobbyResponse = VHSResponse<JoinLobbyData>;

// Union type for custom lobby responses
export type UseCustomLobbyResponse = CreateLobbyResponse | JoinLobbyResponse | VHSResponse<void>;
