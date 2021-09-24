import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Compartment } from "../../types/ZCompartment";

function GetStorageCompartments(
   Compartments: Collection<Compartment>
): RequestHandler {
   const getStorageCompartments: RequestHandler = async (req, res) => {
      const { SID } = req.params;
      if (!ObjectId.isValid(SID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }
      try {
         const data = await Compartments.find({ storageID: new ObjectId(SID) });
         const compartments = await data.toArray();
         res.status(200).json({
            compartments,
         });
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return getStorageCompartments;
}

export default GetStorageCompartments;
