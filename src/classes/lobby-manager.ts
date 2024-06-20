import { generate } from "randomstring";

class Lobby {
    public code: string;
    public userIds: string[];
    public timestamp: Date;
    constructor(public epicConnectionString: string, userId: string) {
        let possibleCode: string;
        do {
            possibleCode = generate(
                {
                    capitalization: "uppercase",
                    length: 3,
                readable: true,
            })
        } while (LobbyManager.getLobbyByCode(possibleCode));
        this.code = possibleCode;
        this.userIds = [userId];
        this.timestamp = new Date();
    }
    
    
    public getHost() {
        return this.userIds[0]!;
    }
}

export class LobbyManager {
    private static currentLobbies: Lobby[] = [];
    public static createLobby(userId: string, epicConnectionString: string) {
        const lobby = new Lobby(epicConnectionString, userId);
        this.currentLobbies.push(lobby);
        return lobby;
    }

    public static joinLobby(userId: string, code: string) {
        const lobby = this.getLobbyByCode(code);
        if (lobby) {
            lobby.userIds.push(userId);
        }
        return lobby?.epicConnectionString;
    }

    public static getLobbyByCode(roomCode: string) {
        return this.currentLobbies.find(lobby => lobby.code === roomCode.toUpperCase());
    }
    
    public static getLobbyIndexByUser(userId: string) {
        return this.currentLobbies.findIndex(lobby => lobby.getHost() === userId);
    }
    
    public static clearInactiveLobbies() {
        const currentMs = Date.now();
        // Clear lobbies older than 2 hours
        this.currentLobbies = this.currentLobbies.filter(lobby => ((currentMs - lobby.timestamp.getTime()) > 2 * 60 * 60 * 1000))
    }
    
    public static closeLobby(userId: string) {
        this.currentLobbies.splice(this.getLobbyIndexByUser(userId), 1);
    }

}