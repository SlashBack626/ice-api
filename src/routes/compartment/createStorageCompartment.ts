import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { CompartmenSchema, Compartment } from "../../types/ZCompartment";

function CreateStorageCompartment(
   Compartments: Collection<Compartment>
): RequestHandler {
   const createStorageCompartment: RequestHandler = async (req, res) => {
      const { SID } = req.params;
      if (!ObjectId.isValid(SID)) {
         res.status(400).json({ err: "Invalid ObjectId" });
         return;
      }

      const parseRes = CompartmenSchema.omit({ storageID: true }).safeParse(
         req.body
      );
      if (!parseRes.success) {
         res.status(400).json(parseRes.error);
         return;
      }
      const { data } = parseRes;
      const compartment = { storageID: new ObjectId(SID), ...data };
      try {
         const action = await Compartments.insertOne(compartment);
         res.status(200).json(action);
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return createStorageCompartment;
}

export default CreateStorageCompartment;
