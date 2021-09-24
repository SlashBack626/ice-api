import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import RequireJSON from "./middleware/requireJSON";
import CreateCompartment from "./routes/compartment/createCompartment";
import GetCompartments from "./routes/compartment/getCompartments";
import CreateCompartmentItem from "./routes/item/createCompartmentItem";
import CreateStorageItem from "./routes/item/createStorageItem";
import DeleteItem from "./routes/item/deleteItem";
import GetItem from "./routes/item/getItem";
import GetStorageItems from "./routes/item/getStorageItems";
import UpdateItem from "./routes/item/updateItem";
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

const Client = new MongoClient(DBURI);
const DB = Client.db("icy");
const Storages = DB.collection<Storage>("storages");
const Items = DB.collection<Item>("items");
const Compartments = DB.collection<Compartment>("compartments");

app.use(express.json());

// Get all storages
app.get("/storages", GetAll(Storages));

// create a new storage
app.post("/storages", RequireJSON, CreateStorage(Storages));

// update an existing storage
app.put("/storages/:SID", RequireJSON, UpdateStorage(Storages));

// Get a storage by ID
app.get("/storages/:SID", GetStorage(Storages));

// delete a storage by ID
app.delete("/storages/:SID", DeleteStorage(Storages));

// get all items from a storage
app.get("/storages/:SID/items", GetStorageItems(Items));

// create a new Item in storage
app.post("/storages/:SID/items", RequireJSON, CreateStorageItem(Items));

// get compartments from a storage
app.get("/storages/:SID/compartments/", GetCompartments(Compartments));

// create a new compartment
app.post(
   "/storages/:SID/compartments",
   RequireJSON,
   CreateCompartment(Compartments)
);

// create a new Item in compartment
app.post(
   "/storages/:SID/compartments/:CID/items",
   RequireJSON,
   CreateCompartmentItem(Items)
);

// get item by ID
app.get("/items/:ID", GetItem(Items));

// update item by ID
app.put("/items/:ID", RequireJSON, UpdateItem(Items));

// delete item by ID
app.delete("/items/:ID", DeleteItem(Items));

// get compartment by ID
app.get("/compartments/:CID");

// update compartment by ID
app.put("/compartments/:CID");

// delete compartment by ID
app.delete("/compartments/:CID");

// get items in compartment
app.get("/compartments/:CID/items");

async function init() {
   await Client.connect();
   app.listen(3000, () => {
      console.log("started");
   });
}

init();
