import {
  SaveGameResponse,
  SavedData,
  SeasonalEvents,
} from "../types/save-game";
import { DBConstants } from "./constants";
import Datastore from "@seald-io/nedb";
import { Logger } from "./logger";
import { ServerInfo } from "../types/server-info";
import crypto from "crypto";
import { readFile } from "fs/promises";

const CURRENT_VERSION = 2;
export enum Collections {
  USERS = "users",
  SAVE_GAME = "save-games",
  SERVER_INFO = "server-info", // Meta info about the server itself
}

export type WithOptionalId<T> = T & { _id?: string };

// Utility Functions (New)
async function handleDatabaseError<T>(operation: () => Promise<T>, retry = 1): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    Logger.log("Database operation failed: " + String(error));
    if (retry > 0) {
      Logger.log("Retrying database operation...");
      return await handleDatabaseError(operation, retry - 1);
    }
    Logger.log("Failed after retries");
    return null;
  }
}

async function updateCollection<T>(
  collection: Datastore<T>,
  query: Partial<T>,
  update: Partial<T>,
  multi = true
): Promise<number> {
  const { numAffected } = await collection.updateAsync(query, update, { multi });
  if (numAffected === 0) {
    Logger.log(`No records updated for query ${JSON.stringify(query)}`);
  }
  return numAffected;
}

async function removeFields<T>(
  collection: Datastore<T>,
  fields: string[]
): Promise<number> {
  const unsetFields = fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as Record<string, boolean>);

  return await updateCollection(collection, {}, { $unset: unsetFields } as Partial<T>);
}

export class Database {
  db!: Record<Collections, Datastore>;
  token!: string;

  async init() {
    Logger.log("Initializing NeDB database connection");
    let db: Partial<typeof this.db> = {};

    const initOperations = this.getAllDataStores().map(async (collection) => {
      const datastore = new Datastore({ filename: `./db/${collection}.db` });
      db[collection] = datastore;
      await datastore.loadDatabaseAsync();
    });

    await Promise.all(initOperations);
    this.db = db as typeof this.db;
    Logger.log("NeDB loaded");
    return this.postInitHook();
  }

  getAllDataStores() {
    return Object.values(Collections);
  }

  collection<T>(name: Collections): Datastore<WithOptionalId<T>> {
    return this.db[name] as Datastore<WithOptionalId<T>>;
  }

  private async postInitHook() {
    await this.initBaseSavegame();
    await this.initSettings();
  }

  private async initBaseSavegame() {
    await this.db[Collections.SAVE_GAME].ensureIndexAsync({
      fieldName: DBConstants.userIdField,
    });
  }

  private async initSettings() {
    const collection = this.collection<ServerInfo>(Collections.SERVER_INFO);
    let settings = await collection.findOneAsync({});
    
    if (!settings) {
      Logger.log("Generating new JWT secret");
      settings = {
        JWT_SECRET: crypto.randomBytes(64).toString("hex"),
        version: CURRENT_VERSION,
        currentEvent: SeasonalEvents.SET_NoSeasonalEvent,
      };
      await handleDatabaseError(() => collection.insertAsync(settings));
    }
    this.token = settings.JWT_SECRET;

    if (!settings.currentEvent) {
      await updateCollection(collection, {}, { currentEvent: SeasonalEvents.SET_NoSeasonalEvent });
    }

    await this.checkVersionAndMigrations(settings.version);
  }

  private async checkVersionAndMigrations(version: number) {
    Logger.log(`Running migrations for version ${version}`);
    
    const migrationTasks = [
      { version: 0, task: () => this.DLCCharactersFix() },
      { version: 1, task: () => this.removeTrophiesFix() }
    ];

    for (const { version: v, task } of migrationTasks) {
      if (version <= v) await task();
    }

    await updateCollection(
      this.collection<ServerInfo>(Collections.SERVER_INFO),
      {},
      { version: CURRENT_VERSION }
    );
  }

  // Migration Fixes (Using Utility Functions)
  private async DLCCharactersFix() {
    Logger.log("Running DLC Characters migration");
    const saveGames = this.collection<SaveGameResponse>(Collections.SAVE_GAME);
    const base: SaveGameResponse = JSON.parse(
      await readFile("./data/base.json", { encoding: "utf-8" })
    );

    const updateFields = {
      "data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Nerd":
        base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Nerd,
      "data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Anomaly":
        base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Anomaly,
      "data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Eradicator":
        base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Eradicator,
      "base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Nerd":
        base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Nerd,
      "base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Anomaly":
        base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Anomaly,
      "base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Eradicator":
        base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Eradicator,
    };

    await updateCollection(saveGames, {}, { $set: updateFields });
  }

  private async removeTrophiesFix() {
    Logger.log("Running remove trophies migration");
    const saveGames = this.collection<SavedData>(Collections.SAVE_GAME);

    const allSaves = await saveGames.getAllData();
    for (const save of allSaves) {
      save.data.DDT_AllInventoryItemsBit =
        save.data.DDT_AllInventoryItemsBit.filter(
          (item) => !item.item?.startsWith("ID_TR")
        );
    }

    await saveGames.removeAsync({}, { multi: true });
    await saveGames.insertAsync(allSaves);
    await this.initBaseSavegame();
  }

  private async reduceCommonDatabase() {
    Logger.log("Running common properties removal");
    const saveGames = this.collection<SaveGameResponse>(Collections.SAVE_GAME);

    const fieldsToRemove = [
      "data.DDT_AllPlayerAccountPointsBit": true,
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Cheerleader.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_DollMaster.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Jock.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Outsider.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Punk.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Toad.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Virgin.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Werewolf.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Eradicator.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Nerd.points",
      "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Anomaly.points",
      "data.DDT_AllLoadoutsBit.teenAffinities",
      "data.DDT_AllLoadoutsBit.charXpLevelCosts",
      "data.DDT_AllWeaponsBit.pointsByWeaponType",
      "data.DDT_AllWeaponsBit.teenWeaponUnlockLevels",
      "data.DDT_AllWeaponsBit.weaponXpToNextLevel",
      "data.DDT_AllWeaponsBit.stigmaXpToNextLevel",
      "data.DDT_AllWeaponsBit.weaponManifestNumber",
      "data.DDT_AllInventoryItemsBit",
      "data.DDT_AllUnclaimedChestsBit",
      "data.DDT_AllSceneEnactmentStatesBit",
      "data.DDT_JourneyDataBit",
      "data.DDT_GuideSystemBit",
      "data.DDT_AllStoreItemsBit",
      "data.DDT_AllFriendListsBit",
      "data.DDT_SeasonalEventBit",
      "data.DDT_ServerNotificationBit",
      "data.DDT_CommunityGoalsBit",
      "data.serverTime",
      "log"
    ];

    await removeFields(saveGames, fieldsToRemove);
    await saveGames.compactDatafileAsync();
  }
}
