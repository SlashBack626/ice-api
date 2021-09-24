import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item } from "../../types/ZItem";

function GetCompartmentItems(Items: Collection<Item>): RequestHandler {
   const getCompartmentItems: RequestHandler = async (req, res) => {
      const { CID } = req.params;
      if (!ObjectId.isValid(CID)) {
         res.status(400).json({ err: "invalid ObjectId" });
         return;
      }
      try {
         const data = await Items.find({ compartmentID: new ObjectId(CID) });
         const items = await data.toArray();
         res.status(200).json({ items });
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return getCompartmentItems;
}

export default GetCompartmentItems;
