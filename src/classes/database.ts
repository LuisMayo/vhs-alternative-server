import {
  SaveGameResponse,
  SavedData,
  SeasonalEvents,
} from "../types/save-game";

import { DBConstants } from "./constants";
import { Logger } from "./logger";
import { ServerInfo } from "../types/server-info";
import { readFile } from "fs/promises";
import { Collection, MongoClient } from "mongodb";
import { DatabaseShimLayer, DatabaseType } from "./database-shim";

const CURRENT_VERSION = 2;

export class Database {
  db!: DatabaseShimLayer;
  token!: string;

  constructor() {}

  async init() {
    this.db = new DatabaseShimLayer();
    const version = await this.db.init();
    return this.checkVersionAndMigrations(version);
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
    const { numAffected } = await saveGames.updateAsync(
      {},
      {
        $unset: {
          "data.DDT_AllPlayerAccountPointsBit": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Cheerleader.points":
            true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_DollMaster.points":
            true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Jock.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Outsider.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Punk.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Toad.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Virgin.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Werewolf.points": true,
          "data.DDT_AllLoadoutsBit.characterLoadouts.CT_Eradicator.points":
            true,
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
          log: true,
        },
      },
      { multi: true }
    );
    if (numAffected === 0) {
      Logger.log("Error while migrating DLC characters");
      throw new Error();
    }
    saveGames.compactDatafileAsync().then(() => {});
  }
}
