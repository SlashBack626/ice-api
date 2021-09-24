import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item, ItemSchema, ZItemSchema } from "../../types/ZItem";

function CreateStorageItem(Items: Collection<Item>): RequestHandler {
   const createStorageItem: RequestHandler = async (req, res) => {
      const { SID } = req.params;
      if (!ObjectId.isValid(SID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }
      const parsed = ItemSchema.omit({
         compartmentID: true,
         storageID: true,
      }).safeParse(req.body);
      if (!parsed.success) {
         res.status(400).json(parsed.error);
         return;
      }
      const { data } = parsed;
      const item = { storageID: new ObjectId(SID), ...data };
      try {
         const action = await Items.insertOne(item);
         res.status(201).json(action);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return createStorageItem;
}

export default CreateStorageItem;
