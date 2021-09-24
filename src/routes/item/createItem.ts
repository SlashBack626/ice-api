import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item, ItemSchema, ZItemSchema } from "../../types/ZItem";

function CreateItem(Items: Collection<Item>): RequestHandler {
   const createItem: RequestHandler = async (req, res) => {
      const { SID } = req.params;
      const item = { storageID: SID, ...req.body };
      const parsed = ItemSchema.safeParse(item);
      if (!parsed.success) {
         res.status(400).json(parsed.error);
         return;
      }
      const { data } = parsed;
      try {
         const action = await Items.insertOne(data);
         res.status(201).json(action);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return createItem;
}

export default CreateItem;
