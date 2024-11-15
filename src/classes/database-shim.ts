import { Collection, MongoClient, ObjectId } from "mongodb";
import Datastore from "@seald-io/nedb";
import { Logger } from "./logger";
import { DBConstants } from "./constants";
import crypto from "crypto";
import { PartialDeep } from "type-fest";
import { SaveGameResponse, SeasonalEvents } from "../types/save-game";
import { readFile } from "fs/promises";


export const CURRENT_VERSION = 2;

export enum Collections {
  USERS = "users",
  SAVE_GAME = "save-games",
  SERVER_INFO = "server-info", // Meta info about the server itself
}

export type WithOptionalId<T> = T & { _id?: string };

export type DatabaseType =
  | {
      type: "nedb";
      db: Record<Collections, Datastore>;
    }
  | {
      type: "mongodb";
      db: Record<Collections, Collection>;
    };

export class DatabaseShimLayer {
  private db!: DatabaseType;
  token!: string;
  constructor() {}

  async findOne<T extends Record<string, any>>(
    collection: Collections,
    query: Object
  ): Promise<T | null> {
    // Arguments are compatible
    if (this.db.type === "nedb") {
      return this.db.db[collection].findOneAsync<T>(query);
    } else {
      return this.db.db[collection].findOne<T>(query);
    }
  }

  async update<T extends Record<string, any>>(
    collection: Collections,
    query: Object,
    obj: T
  ): Promise<unknown> {
    // Arguments are compatible
    if (this.db.type === "nedb") {
      return this.db.db[collection].updateAsync<T>(query, obj);
    } else {
      return this.db.db[collection].updateMany(query, obj);
    }
  }

  async replace<T extends Record<string, any>>(
    collection: Collections,
    query: Object,
    obj: T
  ): Promise<unknown> {
    // Arguments are compatible
    if (this.db.type === "nedb") {
      return this.db.db[collection].updateAsync<T>(query, obj);
    } else {
      return this.db.db[collection].replaceOne(query, obj);
    }
  }

  async insert<T extends Record<string, any>>(
    collection: Collections,
    obj: T
  ): Promise<string> {
    // Arguments are compatible
    if (this.db.type === "nedb") {
      return (await this.db.db[collection].insertAsync<T>(obj))._id;
    } else {
      return (
        await this.db.db[collection].insertOne(obj)
      ).insertedId.toString();
    }
  }

  async remove(collection: Collections, query: Object): Promise<number> {
    // Arguments are compatible
    if (this.db.type === "nedb") {
      return this.db.db[collection].removeAsync(query, { multi: false });
    } else {
      return (await this.db.db[collection].deleteOne(query)).deletedCount;
    }
  }

  async getSavegame(id: string): Promise<{
    userSaveGame: WithOptionalId<PartialDeep<SaveGameResponse>> | null;
    needsMerge: boolean;
  }> {
    if (this.db.type === "nedb") {
      const userSaveGame = await this.db.db[Collections.SAVE_GAME].findOneAsync<
        WithOptionalId<SaveGameResponse>
      >({
        [DBConstants.userIdField]: id,
      });
      return { userSaveGame: userSaveGame, needsMerge: true };
    } else {
      const pipeline = this.db.db[Collections.SAVE_GAME].aggregate<
        WithOptionalId<SaveGameResponse>
      >([
        {
          $match: {
            $or: [
              {
                _id: new ObjectId(id),
              },
              {
                base: true,
              },
            ],
          },
        },
        {
          $group: {
            _id: new ObjectId(id),
            mergedDocument: {
              $mergeObjects: "$$ROOT",
            },
            foundTarget: {  $eq: ["$_id", id] } 
          },
        },
        {
          $match: {
            foundTarget: true,
          }
        },
        {
          $replaceRoot: {
            newRoot: "$mergedDocument",
          },
        },
        {
          $project: {
            base: 0,
          },
        },
      ]);
      return { userSaveGame: await pipeline.next(), needsMerge: false };
    }
  }

  async init(): Promise<number> {
    if (process.env.mongodbUri) {
      Logger.log("Initialiting MongoDB database connection");
      try {
        const client = new MongoClient(process.env.mongodbUri);
        const database = client.db("vhs-end-server");
        let db: Partial<typeof this.db.db> = {};
        for (const collection of this.getAllDataStores()) {
          const mongoCollection = database.collection(collection);
          db[collection] = mongoCollection;
        }
        this.db = { type: "mongodb", db: db as Record<Collections, Collection> };
        Logger.log("MongoDB connection Loaded");
      } catch (error) {
        Logger.log(String(error));
        Logger.log("MongoDB has failed. Attempting NEDB");
        await this.initNeDB();
      }
    } else {
      await this.initNeDB();
    }
    return this.postInitHook();
  }

  private async initNeDB() {
    Logger.log("Initialiting NeDB database connection");
    let db: Partial<typeof this.db.db> = {};
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
        const ds = new Datastore();
        ds.setAutocompactionInterval(2 * 60 * 60 * 1000);
        db[collection] = ds;
      }
    }
    this.db = { type: "nedb", db: db as Record<Collections, Datastore> };
    return;
  }

  private async postInitHook() {
    await this.initBaseSavegame();
    return this.initSettings();
  }

  private async initBaseSavegame() {
    if (this.db.type === "nedb") {
      await this.db.db[Collections.SAVE_GAME].ensureIndexAsync({
        fieldName: DBConstants.userIdField,
      });
    } else {
      await this.db.db[Collections.SAVE_GAME].createIndex(
        DBConstants.userIdField
      );
      const base = await this.db.db[Collections.SAVE_GAME].findOne({base: true});
      if (!base) {
        const newBase = JSON.parse(
          await readFile("./data/base.json", { encoding: "utf-8" })
        );
        newBase.base = true;
        await this.db.db[Collections.SAVE_GAME].insertOne(newBase);
      }
    }
  }

  private async initSettings() {
    let settings = await this.findOne(Collections.SERVER_INFO, {});
    if (settings == null) {
      Logger.log("Generating new JWT secret");
      settings = {
        JWT_SECRET: crypto.randomBytes(64).toString("hex"),
        version: CURRENT_VERSION,
        currentEvent: SeasonalEvents.SET_NoSeasonalEvent,
      };
      this.insert(Collections.SERVER_INFO, settings).catch(Logger.log);
    }
    this.token = settings.JWT_SECRET;

    if (!settings.currentEvent) {
      await this.update(
        Collections.SERVER_INFO,
        {},
        { $set: { currentEvent: SeasonalEvents.SET_NoSeasonalEvent } }
      );
    }
    return settings.version;
  }

  public getAllDataStores() {
    return Object.values(Collections);
  }
}
