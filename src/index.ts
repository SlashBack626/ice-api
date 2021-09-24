import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import RequireJSON from "./middleware/requireJSON";
import CreateItem from "./routes/item/createItem";
import GetItems from "./routes/item/getItems";
import CreateStorage from "./routes/storage/createStorage";
import DeleteStorage from "./routes/storage/deleteStorage";
import GetAll from "./routes/storage/getAll";
import GetStorage from "./routes/storage/getStorage";
import UpdateStorage from "./routes/storage/updateStorage";
import { Compartment } from "./types/ZCompartment";
import { Item } from "./types/ZItem";
import { Storage } from "./types/ZStorage";

const app = express();

const DBURI = process.env.DB_URL ?? "mongodb://localhost:27017";
console.log(DBURI);
const Client = new MongoClient(DBURI);
const DB = Client.db("icy");
const Storages = DB.collection<Storage>("storages");
const Items = DB.collection<Item>("items");
const Compartments = DB.collection<Compartment>("compartments");

app.use(express.json());

app.get("/storages", GetAll(Storages));

app.post("/storages", RequireJSON, CreateStorage(Storages));

app.put("/storages/:ID", RequireJSON, UpdateStorage(Storages));

app.get("/storages/:ID", GetStorage(Storages));

app.delete("/storages/:ID", DeleteStorage(Storages));

app.get("/storages/:SID/items", GetItems(Items));

app.post("/storages/:SID/items", RequireJSON, CreateItem(Items));

async function init() {
   await Client.connect();
   app.listen(3000, () => {
      console.log("started");
   });
}

init();
