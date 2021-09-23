import { RequestHandler } from "express";
import { Collection } from "mongodb";
import { Storage } from "../../types/ZStorage";

function GetAll(Storages: Collection<Storage>): RequestHandler {
   const getAll: RequestHandler = async (req, res) => {
      const cursor = Storages.find();
      try {
         const data = await cursor.toArray();
         res.status(200).json({
            storages: data,
         });
      } catch (error) {
         console.log(error);
         res.status(500).json(error);
      }
   };
   return getAll;
}

export default GetAll;
