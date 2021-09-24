import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item } from "../../types/ZItem";

function GetStorageItems(Items: Collection<Item>): RequestHandler {
   const getStorageItems: RequestHandler = async (req, res) => {
      const { SID } = req.params;
      if (!ObjectId.isValid(SID)) {
         res.status(400).json({ err: "invalid ObjectId" });
         return;
      }
      try {
         const data = await Items.find({ storageID: new ObjectId(SID) });
         const items = await data.toArray();
         res.status(200).json({ items });
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return getStorageItems;
}

export default GetStorageItems;
