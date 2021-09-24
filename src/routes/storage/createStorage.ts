import { RequestHandler } from "express";
import { Collection } from "mongodb";
import { Storage, StorageSchema } from "../../types/ZStorage";

function CreateStorage(Storages: Collection<Storage>): RequestHandler {
   const createStorage: RequestHandler = async (req, res) => {
      const data = req.body;
      const parseRes = StorageSchema.safeParse(data);
      if (!parseRes.success) {
         res.status(400).json(parseRes.error);
         return;
      }
      try {
         const action = await Storages.insertOne(parseRes.data);
         res.status(201).json(action);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return createStorage;
}

export default CreateStorage;
