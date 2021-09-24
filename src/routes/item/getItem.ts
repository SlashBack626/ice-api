import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item } from "../../types/ZItem";

function GetItem(Items: Collection<Item>): RequestHandler {
   const getItem: RequestHandler = async (req, res) => {
      const { ID } = req.params;
      if (!ObjectId.isValid(ID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }
      try {
         const data = await Items.findOne({ _id: new ObjectId(ID) });
         if (!data) {
            res.sendStatus(404);
            return;
         }
         res.status(200).json(data);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return getItem;
}

export default GetItem;
