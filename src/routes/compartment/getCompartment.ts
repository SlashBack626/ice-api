import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Compartment } from "../../types/ZCompartment";

function GetCompartment(Compartments: Collection<Compartment>): RequestHandler {
   const getCompartment: RequestHandler = async (req, res) => {
      const { CID } = req.params;

      if (!ObjectId.isValid(CID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }
      try {
         const data = await Compartments.findOne({ _id: new ObjectId(CID) });
         if (!data) {
            res.sendStatus(404);
            return;
         }
         res.status(200).json(data);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return getCompartment;
}

export default GetCompartment;
