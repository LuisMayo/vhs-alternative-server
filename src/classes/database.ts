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
export class Database {
  db!: Record<Collections, Datastore>;
  token!: string;

  constructor() {}

  async init() {
    Logger.log("Initialiting NeDB database connection");
    let db: Partial<typeof this.db> = {};
    try {
      const promises: Promise<unknown>[] = [];
      for (const collection of this.getAllDataStores()) {
        const datastore = new Datastore({
          filename: "./db/" + collection + ".db",
        });
        db[collection] = datastore;
        promises.push(datastore.loadDatabaseAsync());
      }
      await Promise.all(promises);
      Logger.log("NeDB loaded");
    } catch (error) {
      Logger.log(String(error));
      Logger.log(
        "Persistent NeDB has failed. Server will work but progress will be lost at restart"
      );
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
  }

  private async initBaseSavegame() {
    await this.db[Collections.SAVE_GAME].ensureIndexAsync({
      fieldName: DBConstants.userIdField,
    });
  }

  private async initSettings() {
    const collection = this.collection<ServerInfo>(Collections.SERVER_INFO);
    let settings = await collection.findOneAsync({});
    if (settings == null) {
      Logger.log("Generating new JWT secret");
      settings = {
        JWT_SECRET: crypto.randomBytes(64).toString("hex"),
        version: CURRENT_VERSION,
        currentEvent: SeasonalEvents.SET_NoSeasonalEvent,
      };
      collection.insertAsync(settings).catch(Logger.log);
    }
    this.token = settings.JWT_SECRET;

    if (!settings.currentEvent) {
      await collection.updateAsync(
        {},
        { $set: { currentEvent: SeasonalEvents.SET_NoSeasonalEvent } }
      );
    }
    await this.checkVersionAndMigrations(settings.version);
  }

  private async checkVersionAndMigrations(version: number) {
    // Switch without breaks because migrations should be secuencial and cummulative
    switch (version) {
      default: // If version was pre-0
        await this.DLCCharactersFix();
      case 0: // if version was pre-1 (you get the idea)
        await this.removeTrophiesFix();
      case 1:
        this.reduceCommonDatabase();    
        break;
      case CURRENT_VERSION:
        break;
    }
    await this.collection<ServerInfo>(Collections.SERVER_INFO).updateAsync(
      {},
      { $set: { version: CURRENT_VERSION } }
    );
  }

  private async DLCCharactersFix() {
    Logger.log("Running DLC Characters migration");
    const saveGames = this.collection<SaveGameResponse>(Collections.SAVE_GAME);
    const base: SaveGameResponse = JSON.parse(
      await readFile("./data/base.json", { encoding: "utf-8" })
    );
    const { numAffected } = await saveGames.updateAsync(
      {},
      {
        $set: {
          "data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Nerd":
            base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!.CT_Nerd,
          "data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Anomaly":
            base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!
              .CT_Anomaly,
          "data.DDT_AllWeaponsBit.weaponLoadoutsByCharacterType.CT_Eradicator":
            base.data.DDT_AllWeaponsBit!.weaponLoadoutsByCharacterType!
              .CT_Eradicator,
          "base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Nerd":
            base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Nerd,
          "base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Anomaly":
            base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Anomaly,
          "base.data.DDT_JourneyDataBit.journeysByJourneyKey.CT_Eradicator":
            base.data.DDT_JourneyDataBit!.journeysByJourneyKey!.CT_Eradicator,
        },
      },
      { multi: true }
    );
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
      save.data.DDT_AllInventoryItemsBit =
        save.data.DDT_AllInventoryItemsBit.filter(
          (item) => !item.item?.startsWith("ID_TR")
        );
    }
    await saveGames.removeAsync({}, { multi: true });
    await saveGames.insertAsync(allSaves);
    await this.initBaseSavegame();
    Logger.log("Migration Done");
  }

  private async reduceCommonDatabase() {
    Logger.log("Running common properties database removal");
    const saveGames = this.collection<SaveGameResponse>(Collections.SAVE_GAME);
    const base: SaveGameResponse = JSON.parse(
      await readFile("./data/base.json", { encoding: "utf-8" })
    );
    const { numAffected } = await saveGames.updateAsync(
      {},
      {
        $unset: {
          "data.DDT_AllPlayerAccountPointsBit": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Cheerleader.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_DollMaster.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Jock.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Outsider.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Punk.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Toad.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Virgin.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Werewolf.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Eradicator.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Nerd.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Anomaly.points": true,
          "data.DDT_AllLoadoutsBit.teenAffinities": true,
          "data.DDT_AllLoadoutsBit.charXpLevelCosts": true,
          "data.DDT_AllWeaponsBit.pointsByWeaponType": true,
          "data.DDT_AllWeaponsBit.teenWeaponUnlockLevels": true,
          "data.DDT_AllWeaponsBit.weaponXpToNextLevel": true,
          "data.DDT_AllWeaponsBit.stigmaXpToNextLevel": true,
          "data.DDT_AllWeaponsBit.weaponManifestNumber": true,
          "data.DDT_AllInventoryItemsBit": true,
          "data.DDT_AllUnclaimedChestsBit": true,
          "data.DDT_AllSceneEnactmentStatesBit": true,
          "data.DDT_JourneyDataBit": true,
          "data.DDT_GuideSystemBit": true,
          "data.DDT_AllStoreItemsBit": true,
          "data.DDT_AllFriendListsBit": true,
          "data.DDT_SeasonalEventBit": true,
          "data.DDT_ServerNotificationBit": true,
          "data.DDT_CommunityGoalsBit": true,
          "data.serverTime": true,
          "log": true
        },
      },
      { multi: true }
    );
    if (numAffected === 0) {
      Logger.log("Error while migrating DLC characters");
      throw new Error();
    }
  }
}
