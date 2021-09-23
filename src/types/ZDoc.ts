import { ObjectId } from "mongodb";
import { z } from "zod";
import ZObjectId from "./ZObjectIdSchema";

const ZDocSchema = z.object({
   _id: ZObjectId.create().default(() => new ObjectId()),
   createdAt: z
      .date()
      .default(() => new Date())
      .transform(() => new Date()),
});

type ZDoc = z.infer<typeof ZDocSchema>;
export { ZDoc, ZDocSchema };
