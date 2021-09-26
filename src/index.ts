import express from "express";
import { MongoClient } from "mongodb";
import RequireJSON from "./middleware/requireJSON";
import CreateStorageCompartment from "./routes/compartment/createStorageCompartment";
import DeleteCompartment from "./routes/compartment/deleteCompartment";
import GetCompartment from "./routes/compartment/getCompartment";
import GetStorageCompartments from "./routes/compartment/getStorageCompartments";
import UpdateCompartment from "./routes/compartment/updateCompartment";
import CreateCompartmentItem from "./routes/item/createCompartmentItem";
import CreateStorageItem from "./routes/item/createStorageItem";
import DeleteItem from "./routes/item/deleteItem";
import GetCompartmentItems from "./routes/item/getCompartmentItems";
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
import { User } from "./types/ZUser";
import AuthenticateUser from "./middleware/authenticateUser";
import Authenticate from "./routes/auth/authenticate";
import SignUp from "./routes/auth/signup";

const app = express();

const DBURI = process.env.DB_URL ?? "mongodb://localhost:27017";

const Client = new MongoClient(DBURI);
const DB = Client.db("icy");
const Storages = DB.collection<Storage>("storages");
const Items = DB.collection<Item>("items");
const Compartments = DB.collection<Compartment>("compartments");
const Users = DB.collection<User>("users");

app.use(
   express.json(),
   AuthenticateUser({ ignoreRoutes: ["/authenticate", "/signup"] })
);

// Authenticate a user with email & password
app.post("/authenticate", Authenticate(Users));

// Create a new User
app.post("/signup", SignUp(Users));

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
app.get("/storages/:SID/compartments/", GetStorageCompartments(Compartments));

// create a new compartment
app.post(
   "/storages/:SID/compartments",
   RequireJSON,
   CreateStorageCompartment(Compartments)
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
app.get("/compartments/:CID", GetCompartment(Compartments));

// update compartment by ID
app.put("/compartments/:CID", RequireJSON, UpdateCompartment(Compartments));

// delete compartment by ID
app.delete("/compartments/:CID", DeleteCompartment(Compartments));

// get items in compartment
app.get("/compartments/:CID/items", GetCompartmentItems(Items));

async function init() {
   await Client.connect();
   app.listen(3000, () => {
      console.log("started");
   });
}

init();
