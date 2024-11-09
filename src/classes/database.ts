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
  static db: DatabaseShimLayer;
  token!: string;

  constructor() {}

  static async init() {
    Database.db = new DatabaseShimLayer();
    const version = await Database.db.init();
  }
}
