import { User } from "../types/ZUser";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

function createToken(user: User) {
   if (!SECRET) throw new Error("NO JWT SECRET CONFIGURED");
   return jwt.sign(
      {
         userID: user._id,
         username: user.name,
      },
      SECRET,
      {
         expiresIn: "1h",
      }
   );
}

export { createToken };
