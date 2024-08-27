enum Role {
  EVIL,
  TEEN,
}

class MatchmakingSession {
  private static nextId = 0;
  public id: number;
  public players: { id: string; role: Role; checkin?: boolean }[] = [];
  public lobbyCode?: string;
  timestamp: any;

  constructor() {
    this.id = MatchmakingSession.nextId++;
    if (MatchmakingSession.nextId >= Number.MAX_SAFE_INTEGER) {
      MatchmakingSession.nextId = 0;
    }
  }

  public spotsFree(role: Role): number {
    return this.spotsPerRole(role) - this.spotsUsed(role);
  }

  public spotsUsed(role: Role): number {
    return this.players.filter((player) => player.role === role).length;
  }

  public roleNeeded(role: Role): boolean {
    return this.spotsUsed(role) < this.spotsPerRole(role);
  }

  public playerIsInSession(id: string): boolean {
    return this.players.some((player) => player.id === id);
  }

  public removePlayerFromSession(id: string): void {
    const idx = this.players.findIndex((player) => player.id === id);
    if (idx !== -1) {
      this.players.splice(idx, 1);
    }
  }

  private spotsPerRole(role: Role): number {
    return role === Role.EVIL ? 1 : 4;
  }
}

// TODO: Implement session closure mechanism
export class MatchmakingManager {
  private static sessions: MatchmakingSession[] = [];

  public static joinSessionForRole(id: string, role: Role): MatchmakingSession {
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

  public static notifyRoomCode(id: string, code: string): void {
    const session = MatchmakingManager.sessions.find((session) =>
      session.playerIsInSession(id)
    );

    if (!session) {
      throw new Error("Session not found");
    } else {
      session.lobbyCode = code;
    }
  }

  public static stopMatchmaking(id: string): void {
    const session = MatchmakingManager.sessions.find((session) =>
      session.playerIsInSession(id)
    );

    if (session) {
      session.removePlayerFromSession(id);
      MatchmakingManager.mergeSessions(session);
    } else {
      throw new Error("Session not found");
    }
  }

  private static mergeSessions(downsizedSession: MatchmakingSession): void {
    const candidateForMerge = MatchmakingManager.sessions.find(
      (session) =>
        session.spotsFree(Role.EVIL) >= downsizedSession.spotsUsed(Role.EVIL) &&
        session.spotsFree(Role.TEEN) >= downsizedSession.spotsUsed(Role.TEEN)
    );

    if (candidateForMerge) {
      candidateForMerge.players.push(...downsizedSession.players);
      const idx = MatchmakingManager.sessions.findIndex(session => session.id === downsizedSession.id);
      if (idx !== -1) {
        MatchmakingManager.sessions.splice(idx, 1);
      }
    }
  }

  public static closeInactiveSessions(): void {
    const now = Date.now();
    // Define your inactivity threshold (e.g., 1 hour)
    const inactivityThreshold = 60 * 60 * 1000;
    MatchmakingManager.sessions = MatchmakingManager.sessions.filter(session =>
      now - session.timestamp.getTime() < inactivityThreshold
    );
  }
}
