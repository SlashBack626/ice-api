import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import RequireJSON from "./middleware/requireJSON";
import CreateStorage from "./routes/storage/createStorage";
import DeleteStorage from "./routes/storage/deleteStorage";
import GetAll from "./routes/storage/getAll";
import GetStorage from "./routes/storage/getStorage";
import UpdateStorage from "./routes/storage/updateStorage";
import { Compartment } from "./types/ZCompartment";
import { Item } from "./types/ZItem";
import { Storage } from "./types/ZStorage";

const app = express();

const Client = new MongoClient("mongodb://localhost:27017");
const DB = Client.db("icy");
const Storages = DB.collection<Storage>("storages");
const Items = DB.collection<Item>("items");
const Compartments = DB.collection<Compartment>("compartments");

app.use(express.json());

app.get("/storages", GetAll(Storages));

app.post("/storage", RequireJSON, CreateStorage(Storages));

app.put("/storage/:ID", RequireJSON, UpdateStorage(Storages));

app.get("/storage/:ID", GetStorage(Storages));

app.delete("/storage/:ID", DeleteStorage(Storages));

async function init() {
   await Client.connect();
   app.listen(3000, () => {
      console.log("started");
   });
}

init();