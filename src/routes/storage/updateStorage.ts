import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Storage, ZStorageSchema } from "../../types/ZStorage";

function UpdateStorage(Storages: Collection<Storage>): RequestHandler {
   const updateStorage: RequestHandler = async (req, res) => {
      const { ID } = req.params;
      const parsed = ZStorageSchema.safeParse(req.body);
      if (!parsed.success) {
         res.status(400).json(parsed.error);
         return;
      }
      const { data } = parsed;
      try {
         await Storages.updateOne(
            { _id: new ObjectId(ID) },
            { $set: { ...data } }
         );
         res.sendStatus(200);
      } catch (error) {
         console.log(error);
         res.status(500).json(error);
      }
   };
   return updateStorage;
}

export default UpdateStorage;
