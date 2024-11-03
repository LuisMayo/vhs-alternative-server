export enum Role {
  EVIL,
  TEEN,
}

class MatchmakingSession {
  private static nextId = 0;
  public id: number;

  constructor() {
    this.id = MatchmakingSession.nextId++;
    if (MatchmakingSession.nextId >= Number.MAX_SAFE_INTEGER) {
      MatchmakingSession.nextId = 0;
    }
  }
  players: { id: string; role: Role; checkin?: boolean; name: string }[] = [];
  lobbyCode?: string;

  spotsFree(role: Role) {
    return this.spotsPerRole(role) - this.spotsUsed(role);
  }

  spotsUsed(role: Role) {
    return this.players.filter((player) => player.role === role).length;
  }

  roleNeeded(role: Role) {
    const numberNeeded = this.spotsPerRole(role);
    return this.spotsUsed(role) < numberNeeded;
  }

  playerIsInSession(id: string) {
    return this.players.some((player) => player.id === id);
  }

  removePlayerFromSession(id: string) {
    const idx = this.players.findIndex((player) => player.id === id);
    this.players.splice(idx, 1);
  }

  private spotsPerRole(role: Role) {
    // TODO, change surv spots to 4
    return role === Role.EVIL ? 1 : 1;
  }
}

// TODO close the session
export class MatchmakingManager {
  private static sessions: MatchmakingSession[] = [];

  public static joinSessionForRole(id: string, role: Role) {
    const openSession = MatchmakingManager.sessions.find((session) =>
      session.roleNeeded(role)
    );
    if (openSession) {
      openSession.players.push({ id, role });
      return openSession;
    } else {
      const newSession = new MatchmakingSession();
      newSession.players.push({ id, role });
      MatchmakingManager.sessions.push(newSession);
      return newSession;
    }
  }

  public static notifyRoomCode(id: string, code: string) {
    const session = MatchmakingManager.sessions.find((session) =>
      session.playerIsInSession(id)
    );
    if (!session) {
      throw new Error("session not found");
    } else {
      session.lobbyCode = code;
    }
  }

  public static stopMatchmaking(id: string) {
    const session = MatchmakingManager.sessions.find((session) =>
      session.playerIsInSession(id)
    );
    if (session) {
      session.removePlayerFromSession(id);
      this.mergeSessions(session);
    }
  }

  private static mergeSessions(downsizedSession: MatchmakingSession) {
    const candidateForMerge = MatchmakingManager.sessions.find(
      (session) =>
        session.spotsFree(Role.EVIL) >= downsizedSession.spotsUsed(Role.EVIL) &&
        session.spotsFree(Role.TEEN) >= downsizedSession.spotsUsed(Role.TEEN)
    );

    if (candidateForMerge) {
      candidateForMerge.players.push(...downsizedSession.players);
      const idx = MatchmakingManager.sessions.findIndex(
        (session) => session.id === downsizedSession.id
      );
      MatchmakingManager.sessions.splice(idx, 1);
    }
  }
}
