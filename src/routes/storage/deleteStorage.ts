import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Storage } from "../../types/ZStorage";

function DeleteStorage(Storages: Collection<Storage>): RequestHandler {
   const deleteStorage: RequestHandler = async (req, res) => {
      const { ID } = req.params;
      if (!ObjectId.isValid(ID)) {
         res.status(400).json({ err: "invalid id" });
      }
      try {
         await Storages.deleteOne({ _id: new ObjectId(ID) });
         res.sendStatus(200);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return deleteStorage;
}

export default DeleteStorage;
