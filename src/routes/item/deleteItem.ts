import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item } from "../../types/ZItem";

function DeleteItem(Items: Collection<Item>): RequestHandler {
   const deleteItem: RequestHandler = async (req, res) => {
      const { ID } = req.params;
      if (!ObjectId.isValid(ID)) {
         res.status(400).json({ err: "Invalid ObjcedId" });
         return;
      }
      try {
         await Items.deleteOne({ _id: new ObjectId(ID) });
         res.sendStatus(200);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return deleteItem;
}

export default DeleteItem;
