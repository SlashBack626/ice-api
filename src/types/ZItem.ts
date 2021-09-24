import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZItemSchema = z.object({
   name: z.string(),
   BBD: z.date().optional(),
   storageID: ZObjectId.create(),
   compartmentID: ZObjectId.create().optional(),
});

type ZItem = z.infer<typeof ZItemSchema>;

const ItemSchema = ZItemSchema.merge(ZDocSchema);

type Item = z.infer<typeof ItemSchema>;
export { ZItem, ZItemSchema, Item, ItemSchema };
