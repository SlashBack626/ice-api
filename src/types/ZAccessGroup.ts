import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZAccessGroupSchema = z.object({
   userID: ZObjectId.create(),
   read: z.array(ZObjectId.create()).default([]), // store storageIDs
   write: z.array(ZObjectId.create()).default([]),
   delete: z.array(ZObjectId.create()).default([]),
});

type ZAccessGroup = z.infer<typeof ZAccessGroupSchema>;

const AccessGroupSchema = ZAccessGroupSchema.merge(ZDocSchema);

type AccessGroup = z.infer<typeof AccessGroupSchema>;

export { ZAccessGroup, ZAccessGroupSchema, AccessGroup, AccessGroupSchema };
