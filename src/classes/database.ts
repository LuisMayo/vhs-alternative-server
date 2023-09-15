import { DBConstants } from "./constants";
import Datastore from "@seald-io/nedb";
import { Logger } from "./logger";
import { ServerInfo } from "../types/server-info";
import crypto from 'crypto';
import { readFile } from "fs/promises";

export enum Collections {
  USERS = "users",
  SAVE_GAME = "save-games",
  SERVER_INFO = "server-info" // Meta info about the server itself
}

export type WithOptionalId<T> = T & {_id?: string};
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
        const datastore =  new Datastore({ filename: "./db/" + collection + '.db' });
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
    this.postInitHook().then();
  }

  getAllDataStores() {
    return Object.values(Collections);
  }

  collection<T>(name: Collections) {
    return this.db[name] as Datastore<WithOptionalId<T>>;
  }

  private async postInitHook() {
    this.initBaseSavegame().then();
    this.initJWTSecurity().then();
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

  private async initJWTSecurity() {
    const collection = this.collection<ServerInfo>(Collections.SERVER_INFO);
    let settings = await collection.findOneAsync({});
    if (settings == null) {
      Logger.log('Generating new JWT secret');
      settings = {
        JWT_SECRET: crypto.randomBytes(64).toString('hex')
      }
      collection.insertAsync(settings).catch(Logger.log);
    }
    this.token = settings.JWT_SECRET;
  }
}
