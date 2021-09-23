import { z } from "zod";
import { ZDocSchema } from "./ZDoc";

const ZCompartmentSchema = z.object({
   name: z.string(),
});

type ZCompartment = z.infer<typeof ZCompartmentSchema>;

const CompartmenSchema = ZCompartmentSchema.merge(ZDocSchema);

type Compartment = z.infer<typeof CompartmenSchema>;

export { ZCompartment, ZCompartmentSchema, Compartment, CompartmenSchema };
