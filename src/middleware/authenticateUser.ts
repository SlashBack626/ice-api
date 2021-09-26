import { ObjectId } from "bson";
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

interface AuthConfig {
   ignoreRoutes: string[];
}

function AuthenticateUser(config: AuthConfig): RequestHandler {
   const authenticateUser: RequestHandler = async (req, res, next) => {
      if (config.ignoreRoutes.includes(req.path)) {
         await next();
         return;
      }
      if (!JWT_SECRET) {
         res.status(500).json({ err: "No JWT Secret Configured" });
         return;
      }
      const header = req.header("Authorization");
      if (!header) {
         res.sendStatus(401);
         return;
      }
      const [TokenType, Token] = header.split(" ");
      if (TokenType.trim() !== "Bearer") {
         res.status(401).json({ err: "TokenType must be Bearer" });
         return;
      }

      try {
         const decoded = jwt.verify(Token.trim(), JWT_SECRET) as JwtPayload;
         req.userID = new ObjectId(decoded.userID);
         await next();
      } catch (error) {
         res.sendStatus(403).json(error);
      }
   };
   return authenticateUser;
}

export default AuthenticateUser;
