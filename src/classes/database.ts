import { DBConstants } from "./constants";
import Datastore from "@seald-io/nedb";
import { readFile } from "fs/promises";

export enum Collections {
  USERS = "users",
  SAVE_GAME = "save-games",
}

export type WithOptionalId<T> = T & {_id?: string};
export class Database {
  db!: Record<Collections, Datastore>;

  constructor() {}

  async init() {
    console.log("Initialiting NeDB database connection");
    let db: Partial<typeof this.db> = {};
    try {
      const promises: Promise<unknown>[] = [];  
      for (const collection of this.getAllDataStores()) {
        const datastore =  new Datastore({ filename: "./db/" + collection + '.db' });
        db[collection] = datastore;
        promises.push(datastore.loadDatabaseAsync());
      }
      await Promise.all(promises);
      console.log("NeDB loaded");
    } catch (error) {
      console.log(error);
      console.log(
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
}
