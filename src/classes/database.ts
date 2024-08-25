import { SaveGameResponse, SavedData, SeasonalEvents } from "../types/save-game";
import { DBConstants } from "./constants";
import Datastore from "@seald-io/nedb";
import { Logger } from "./logger";
import { ServerInfo } from "../types/server-info";
import crypto from 'crypto';
import { readFile } from "fs/promises";

const CURRENT_VERSION = 1;

export enum Collections {
  USERS = "users",
  SAVE_GAME = "save-games",
  SERVER_INFO = "server-info", // Meta info about the server itself
  MATCHMAKING_QUEUE = "matchmaking-queue", // New collection for matchmaking queue
  GAME_SESSIONS = "game-sessions", // New collection for active game sessions
  MATCHMAKING_CONFIG = "matchmaking-config" // New collection for matchmaking settings
}

export type WithOptionalId<T> = T & { _id?: string };

export class Database {
  db!: Record<Collections, Datastore>;
  token!: string;

  constructor() { }

  async init() {
    Logger.log("Initializing NeDB database connection");
    let db: Partial<typeof this.db> = {};
    try {
      const promises: Promise<unknown>[] = [];
      for (const collection of this.getAllDataStores()) {
        const datastore = new Datastore({ filename: "./db/" + collection + '.db' });
        db[collection] = datastore;
        promises.push(datastore.loadDatabaseAsync());
      }
      await Promise.all(promises);
      Logger.log("NeDB loaded");
    } catch (error) {
      Logger.log(String(error));
      Logger.log("Persistent NeDB has failed. Server will work but progress will be lost at restart");
      db = {};
      for (const collection of this.getAllDataStores()) {
        db[collection] = new Datastore();
      }
    }
    this.db = db as typeof this.db;
    return this.postInitHook();
  }

  getAllDataStores() {
    return Object.values(Collections);
  }

  collection<T>(name: Collections) {
    return this.db[name] as Datastore<WithOptionalId<T>>;
  }

  private async postInitHook() {
    await this.initBaseSavegame();
    await this.initSettings();
    await this.initMatchmakingQueue(); // Initialize matchmaking queue
    await this.initGameSessions(); // Initialize game sessions
    await this.initMatchmakingConfig(); // Initialize matchmaking configuration
  }

  private async initBaseSavegame() {
    const baseJson = await this.db[Collections.SAVE_GAME].findOneAsync(
      {
        [DBConstants.userIdField]: DBConstants.baseSaveGameId,
      }
    );
    if (baseJson == null) {
      const base = JSON.parse(
        await readFile("./data/base.json", { encoding: "utf-8" })
      );
      base[DBConstants.userIdField] = DBConstants.baseSaveGameId;
      await this.db[Collections.SAVE_GAME].insertAsync(base);
      await this.db[Collections.SAVE_GAME].ensureIndexAsync({
        fieldName: DBConstants.userIdField,
      });
    }
  }

  private async initSettings() {
    const collection = this.collection<ServerInfo>(Collections.SERVER_INFO);
    let settings = await collection.findOneAsync({});
    if (settings == null) {
      Logger.log('Generating new JWT secret');
      settings = {
        JWT_SECRET: crypto.randomBytes(64).toString('hex'),
        version: CURRENT_VERSION,
        currentEvent: SeasonalEvents.SET_NoSeasonalEvent,
      }
      collection.insertAsync(settings).catch(Logger.log);
    }
    this.token = settings.JWT_SECRET;

    if (!settings.currentEvent) {
      await collection.updateAsync({}, { $set: { currentEvent: SeasonalEvents.SET_NoSeasonalEvent } });
    }
    await this.checkVersionAndMigrations(settings.version);
  }

  private async initMatchmakingQueue() {
    const collection = this.collection<MatchmakingQueue>(Collections.MATCHMAKING_QUEUE);
    // Initialize the matchmaking queue if necessary
    const queue = await collection.findOneAsync({});
    if (!queue) {
      await collection.insertAsync({ players: [] }); // Empty initial queue
    }
  }

  private async initGameSessions() {
    const collection = this.collection<GameSession>(Collections.GAME_SESSIONS);
    // Initialize the game sessions collection if necessary
    const sessions = await collection.findOneAsync({});
    if (!sessions) {
      await collection.insertAsync({ sessions: [] }); // Empty initial game sessions
    }
  }

  private async initMatchmakingConfig() {
    const collection = this.collection<MatchmakingConfig>(Collections.MATCHMAKING_CONFIG);
    // Initialize matchmaking configuration if necessary
    const config = await collection.findOneAsync({});
    if (!config) {
      await collection.insertAsync({ settings: {} }); // Default config
    }
  }

  private async checkVersionAndMigrations(version: number) {
    switch (version) {
      default: // If version was pre-0
        await this.DLCCharactersFix();
      case 0: // if version was pre-1 (you get the idea)
        await this.removeTrophiesFix();
      case CURRENT_VERSION:
        break;
    }
    await this.collection<ServerInfo>(Collections.SERVER_INFO).updateAsync({}, {$set: {version: CURRENT_VERSION}});
  }

  private async DLCCharactersFix() {
    Logger.log("Running DLC Characters migration");
    const saveGames = this.collection<SaveGameResponse>(Collections.SAVE_GAME);
    const base: SaveGameResponse = JSON.parse(
      await readFile("./data/base.json", { encoding: "utf-8" })
    );
    const {numAffected} = await saveGames.updateAsync({}, { $set: {
      'data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Nerd': base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Nerd,
      'data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Anomaly': base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Anomaly,
      'data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Eradicator': base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Eradicator,
      'base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Nerd': base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Nerd,
      'base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Anomaly': base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Anomaly,
      'base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Eradicator': base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Eradicator,
    } },
    {multi: true})
    if (numAffected === 0) {
      Logger.log("Error while migrating DLC characters");
      throw new Error();
    }
  }

  private async removeTrophiesFix() {
    Logger.log("Running removing trophies migration");
    const saveGames = this.collection<SavedData>(Collections.SAVE_GAME);
    const allSaves = await saveGames.getAllData();
    for (const save of allSaves) {
      save.data.DDT_AllInventoryItemsBit = save.data.DDT_AllInventoryItemsBit.filter(item => !item.item?.startsWith('ID_TR'));
    }
    await saveGames.removeAsync({}, {multi: true});
    await saveGames.insertAsync(allSaves);
    await this.initBaseSavegame();
    Logger.log("Migration Done");
  }
}

// Define the new types for matchmaking
interface MatchmakingQueue {
  players: string[]; // Array of player IDs waiting for a match
}

interface GameSession {
  sessionId: string;
  players: string[]; // Array of player IDs in the session
  state: string; // e.g., 'waiting', 'active', 'completed'
}

interface MatchmakingConfig {
  settings: Record<string, any>; // Store configuration settings for matchmaking
}
