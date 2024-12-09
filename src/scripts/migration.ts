// compile with npx tsc --module "commonjs" --target "es2017" --esModuleInterop "true"  src/scripts/migration.ts
import { MongoClient } from "mongodb";
import Datastore from "@seald-io/nedb";
import { DBConstants } from "../classes/constants";

async function main() {
  const client = new MongoClient(process.env.mongodbUri!);
  const database = client.db("vhs-end-server");
  for (const collection of ["users", "server-info"]) {
    const mongoCollection = database.collection(collection);
    const neCollection = new Datastore({
      filename: "./db/" + collection + ".db",
    });
    await neCollection.loadDatabaseAsync();
    const docs = await neCollection.findAsync({});
    console.log(docs.length);
    mongoCollection.insertMany(docs);
  }
  const mongoCollection = database.collection("save-games");
  const neCollection = new Datastore({
    filename: "./db/save-games.db",
  });
  await neCollection.loadDatabaseAsync();
  const docs = await neCollection.findAsync({});
  const newDocs = docs.map((item) => ({
    data: {
      DDT_AccountStatsBit: item.data.DDT_AccountStatsBit,
      DDT_AllLoadoutsBit: {
        characterLoadouts: {
          CT_Anomaly: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Anomaly.uiSlots,
          },
          CT_Cheerleader: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Cheerleader.uiSlots,
          },
          CT_DollMaster: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_DollMaster.uiSlots,
          },
          CT_Eradicator: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Eradicator.uiSlots,
          },
          CT_Jock: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Jock.uiSlots,
          },
          CT_Nerd: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Nerd.uiSlots,
          },
          CT_Outsider: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Outsider.uiSlots,
          },
          CT_Punk: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Punk.uiSlots,
          },
          CT_Toad: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Toad.uiSlots,
          },
          CT_Virgin: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Virgin.uiSlots,
          },
          CT_Werewolf: {
            uiSlots:
              item.data.DDT_AllLoadoutsBit!.characterLoadouts
                .CT_Werewolf.uiSlots,
          },
        },
      },
      DDT_AllPlayerSlotsBit: item.data.DDT_AllPlayerSlotsBit,
      DDT_AllWeaponsBit: {
        weaponLoadoutsByCharacterType:
          item.data.DDT_AllWeaponsBit
            ?.weaponLoadoutsByCharacterType,
      },
      DDT_SpecificLoadoutsBit:
        item.data.DDT_SpecificLoadoutsBit,
      playerSettingsData: item.data.playerSettingsData,
    },
    [DBConstants.userIdField]: item[DBConstants.userIdField]
  }));
  console.log(docs.length);
  mongoCollection.insertMany(newDocs);
}

main().then();
