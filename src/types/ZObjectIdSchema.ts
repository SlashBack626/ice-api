import { ObjectId } from "mongodb";
import {
   INVALID,
   OK,
   ParseContext,
   ParseReturnType,
   ZodIssueCode,
   ZodParsedType,
   ZodType,
   ZodTypeDef,
} from "zod";
interface ZObjectIdDef extends ZodTypeDef {}

class ZObjectId extends ZodType<ObjectId, ZObjectIdDef> {
   _parse(
      ctx: ParseContext,
      data: unknown,
      parsedType: ZodParsedType
   ): ParseReturnType<ObjectId> {
      if (
         typeof data === "string" ||
         typeof data === "number" ||
         data instanceof ObjectId
      ) {
         if (ObjectId.isValid(data)) {
            return OK(new ObjectId(data));
         } else {
            ctx.addIssue(data, {
               code: ZodIssueCode.custom,
               message: "not a valid ObjectId",
            });
            return INVALID;
         }
      }
      ctx.addIssue(data, {
         code: ZodIssueCode.custom,
         message: "invalid type: must be string, number or ObjectId",
      });
      return INVALID;
   }

   static create(): ZObjectId {
      return new ZObjectId({});
   }
}
export default ZObjectId;
