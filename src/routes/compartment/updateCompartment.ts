import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { Compartment, ZCompartmentSchema } from "../../types/ZCompartment";

function UpdateCompartment(
   Compartments: Collection<Compartment>
): RequestHandler {
   const updateCompartment: RequestHandler = async (req, res) => {
      const { CID } = req.params;

      if (!ObjectId.isValid(CID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }
      const parseRes = ZCompartmentSchema.partial().safeParse(req.body);
      if (!parseRes.success) {
         res.status(400).json(parseRes.error);
         return;
      }
      const { data } = parseRes;
      try {
         await Compartments.updateOne(
            { _id: new ObjectId(CID) },
            { $set: data }
         );
         res.sendStatus(200);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return updateCompartment;
}

export default UpdateCompartment;
