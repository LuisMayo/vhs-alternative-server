import { Collection, Db, MongoClient } from "mongodb";

import { DBConstants } from "./constants";
import Datastore from "@seald-io/nedb";

export class Database {
  currentDbInfo!:
    | {
        type: "mongodb";
        db: Db;
      }
    | {
        type: "nedb";
        db: {[x: string]: Datastore};
      };

  constructor() {}

  async init() {
    console.log("Initialiting mongodb database connection");
    const dbConnection = new MongoClient("mongodb://127.0.0.1");
    try {
      dbConnection.connect();

      this.currentDbInfo = {
        type: "mongodb",
        db: dbConnection.db(DBConstants.databaseName),
      };
      console.log("MongoDB loaded");
    } catch (e) {
      console.log("MongoDB could not be loaded, trying nedb");
      let db = {
        users:  new Datastore('./db/users.db')
      };
      try {
        await Promise.all([db.users.loadDatabaseAsync()]);
        console.log("NeDB loaded");
      } catch (error) {
        console.log(
          "Persistende NeDB has failed. Server will work but progress will be lost at restart"
        );
        db = {
            users:  new Datastore()
          };
      }
      this.currentDbInfo = {
        type: "nedb",
        db,
      };
    }
  }

  async getUserByEpicId(epicId: string) {
    const collection = this.getCollectionByName('users')
    this.getFindOneFromCollectionMethod(collection)({epicId});
  }

  private getCollectionByName(str: string) {
    switch(this.currentDbInfo.type) {
        case "mongodb":
            return this.currentDbInfo.db.collection(str);
            break;
        case "nedb":
            return this.currentDbInfo.db[str];
            break;
    }
  }

  private getFindOneFromCollectionMethod(collection: Collection | Datastore) {
    switch(this.currentDbInfo.type) {
        case "mongodb":
            return (collection as Collection).findOne;
            break;
        case "nedb":
            return (collection as Datastore).findOneAsync;
            break;
    }
  }

  private getUserCollection() {
    return this.currentDbInfo.db.
  }
}
