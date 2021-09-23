import { ObjectId } from "bson";
import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZStorageSchema = z.object({
   name: z.string(),
   location: z.string().optional(),
   description: z.string().optional(),
   compartments: z.array(ZObjectId.create()).optional(),
});

type ZStorage = z.infer<typeof ZStorageSchema>;

const StorageSchema = ZStorageSchema.merge(ZDocSchema);
type Storage = z.infer<typeof StorageSchema>;

export { ZStorage, ZStorageSchema, Storage, StorageSchema };
