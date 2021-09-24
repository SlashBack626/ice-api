import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Compartment } from "../../types/ZCompartment";

function GetCompartments(
   Compartments: Collection<Compartment>
): RequestHandler {
   const getCompartments: RequestHandler = async (req, res) => {
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
   return getCompartments;
}

export default GetCompartments;
