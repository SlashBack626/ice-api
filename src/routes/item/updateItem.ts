import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Item, ZItemSchema } from "../../types/ZItem";

function UpdateItem(Items: Collection<Item>): RequestHandler {
   const updateItem: RequestHandler = async (req, res) => {
      const { ID } = req.params;
      const parsed = ZItemSchema.partial().safeParse(req.body);
      if (!parsed.success) {
         res.status(400).json(parsed.error);
         return;
      }

      try {
         await Items.updateOne(
            { _id: new ObjectId(ID) },
            { $set: parsed.data }
         );
         res.sendStatus(200);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return updateItem;
}

export default UpdateItem;
