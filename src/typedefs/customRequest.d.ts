import { ObjectId } from "mongodb";

declare module "express-serve-static-core" {
   interface Request {
      userID?: ObjectId;
   }
}
