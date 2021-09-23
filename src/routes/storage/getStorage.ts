import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Storage } from "../../types/ZStorage";

function GetStorage(Storages: Collection<Storage>): RequestHandler {
   const getStorage: RequestHandler = async (req, res) => {
      const { ID } = req.params;
      if (!ObjectId.isValid(ID)) {
         res.status(400).json({ err: "invalid ObjectId" });
         return;
      }
      try {
         const data = await Storages.findOne({ _id: new ObjectId(ID) });
         res.status(200).json(data);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return getStorage;
}

export default GetStorage;
