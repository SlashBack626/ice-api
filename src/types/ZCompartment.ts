import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZCompartmentSchema = z.object({
   name: z.string(),
   storageID: ZObjectId.create(),
});

type ZCompartment = z.infer<typeof ZCompartmentSchema>;

const CompartmenSchema = ZCompartmentSchema.merge(ZDocSchema);

type Compartment = z.infer<typeof CompartmenSchema>;

export { ZCompartment, ZCompartmentSchema, Compartment, CompartmenSchema };
