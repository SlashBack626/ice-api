import { RequestHandler } from "express";
import { Collection } from "mongodb";
import { CompartmenSchema, Compartment } from "../../types/ZCompartment";

function CreateCompartment(
   Compartments: Collection<Compartment>
): RequestHandler {
   const createCompartment: RequestHandler = async (req, res) => {
      const { SID } = req.params;
      const parseRes = CompartmenSchema.safeParse(req.body);
      if (!parseRes.success) {
         res.status(400).json(parseRes.error);
         return;
      }
      try {
      } catch (error) {}
   };
   return createCompartment;
}

export default CreateCompartment;
