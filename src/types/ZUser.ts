import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZUserSchema = z.object({
   name: z.string(),
   accessGroupID: ZObjectId.create(),
});

type ZUser = z.infer<typeof ZUserSchema>;

const UserSchema = ZUserSchema.merge(ZDocSchema);

type User = z.infer<typeof UserSchema>;

export { ZUser, ZUserSchema, User, UserSchema };
