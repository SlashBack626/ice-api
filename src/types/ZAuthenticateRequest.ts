import { z } from "zod";
import { ZUserSchema } from "./ZUser";

const ZAuthenticateRequestSchema = ZUserSchema.pick({
   email: true,
}).merge(z.object({ pwd: z.string() }));

type ZAuthenticateRequest = z.infer<typeof ZAuthenticateRequestSchema>;

export { ZAuthenticateRequest, ZAuthenticateRequestSchema };
