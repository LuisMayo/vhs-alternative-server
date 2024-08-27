import { generate } from "randomstring";

class Lobby {
  public code: string;
  public userIds: string[];
  public timestamp: Date;

  constructor(public epicConnectionString: string, userId: string) {
    let possibleCode: string;
    let length = 3;
    let i = 0;
    do {
      if (i >= 3) {
        i = 0;
        length++;
      }
      possibleCode = generate({
        capitalization: "uppercase",
        length,
        readable: true,
      });
      i++;
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
    LobbyManager.currentLobbies.push(lobby);
    return lobby;
  }

  public static joinLobby(userId: string, code: string) {
    const lobby = LobbyManager.getLobbyByCode(code);
    if (!lobby) {
      throw new Error("Lobby not found");
    }
    lobby.userIds.push(userId);
    return lobby.epicConnectionString;
  }

  public static getLobbyByCode(roomCode: string) {
    return LobbyManager.currentLobbies.find(
      (lobby) => lobby.code === roomCode.toUpperCase()
    );
  }

  public static getLobbyIndexByUser(userId: string) {
    return LobbyManager.currentLobbies.findIndex(
      (lobby) => lobby.getHost() === userId
    );
  }

  public static clearInactiveLobbies() {
    const currentMs = Date.now();
    // Clear lobbies older than 2 hours
    LobbyManager.currentLobbies = LobbyManager.currentLobbies.filter(
      (lobby) => currentMs - lobby.timestamp.getTime() <= 2 * 60 * 60 * 1000
    );
  }

  public static closeLobby(userId: string) {
    const index = LobbyManager.getLobbyIndexByUser(userId);
    if (index === -1) {
      throw new Error("Lobby not found for the user");
    }
    LobbyManager.currentLobbies.splice(index, 1);
  }

  // Periodically clean up inactive lobbies
  private static startCleanupTask() {
    setInterval(() => {
      LobbyManager.clearInactiveLobbies();
    }, 60 * 60 * 1000); // Cleanup every hour
  }

  // Initialize the cleanup task when the module is first loaded
  static {
    LobbyManager.startCleanupTask();
  }
}
