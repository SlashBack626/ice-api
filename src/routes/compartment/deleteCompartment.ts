import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Compartment } from "../../types/ZCompartment";

function DeleteCompartment(
   Compartments: Collection<Compartment>
): RequestHandler {
   const deleteCompartment: RequestHandler = async (req, res) => {
      const { CID } = req.params;

      if (!ObjectId.isValid(CID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }
      try {
         await Compartments.deleteOne({ _id: new ObjectId(CID) });
         res.sendStatus(200);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return deleteCompartment;
}

export default DeleteCompartment;
