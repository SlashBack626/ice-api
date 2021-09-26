import { z } from "zod";
import { ZAuthenticateRequestSchema } from "./ZAuthenticateRequest";
import { ZUserSchema } from "./ZUser";

const ZSignUpRequestSchema = ZAuthenticateRequestSchema.and(
   ZUserSchema.pick({ name: true })
);
type ZSignUpRequest = z.infer<typeof ZSignUpRequestSchema>;

export { ZSignUpRequest, ZSignUpRequestSchema };
