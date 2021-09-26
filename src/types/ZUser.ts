import { z } from "zod";
import { ZDocSchema } from "./ZDoc";
import ZObjectId from "./ZObjectIdSchema";

const ZUserSchema = z.object({
   email: z.string().email(),
   pwdHash: z.string(),
   name: z.string(),
});

type ZUser = z.infer<typeof ZUserSchema>;

const UserSchema = ZUserSchema.merge(ZDocSchema);

type User = z.infer<typeof UserSchema>;

export { ZUser, ZUserSchema, User, UserSchema };
