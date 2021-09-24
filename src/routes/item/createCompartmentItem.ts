import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item, ItemSchema } from "../../types/ZItem";

function CreateCompartmentItem(Items: Collection<Item>): RequestHandler {
   const createCompartmentItem: RequestHandler = async (req, res) => {
      const { SID, CID } = req.params;
      if (!ObjectId.isValid(SID) || !ObjectId.isValid(CID)) {
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
      const item = {
         storageID: new ObjectId(SID),
         compartmentID: new ObjectId(CID),
         ...data,
      };
      try {
         const action = await Items.insertOne(item);
         res.status(201).json(action);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return createCompartmentItem;
}

export default CreateCompartmentItem;
