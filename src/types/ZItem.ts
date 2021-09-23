import { ObjectId } from "bson";
import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZItemSchema = z.object({
   _id: ZObjectId.create().default(() => new ObjectId()),
   name: z.string(),
   BBD: z.date().optional(),
   storageID: ZObjectId.create(),
   compartmentID: ZObjectId.create(),
});

type ZItem = z.infer<typeof ZItemSchema>;

const ItemSchema = ZItemSchema.merge(ZDocSchema);

type Item = z.infer<typeof ItemSchema>;
export { ZItem, ZItemSchema, Item, ItemSchema };
