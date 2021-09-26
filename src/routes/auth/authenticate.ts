import { RequestHandler } from "express";
import { Collection } from "mongodb";
import { ZAuthenticateRequestSchema } from "../../types/ZAuthenticateRequest";
import { User } from "../../types/ZUser";
import { compare } from "bcrypt";
import { createToken } from "../../utils/auth";

function Authenticate(Users: Collection<User>): RequestHandler {
   const authenticate: RequestHandler = async (req, res) => {
      // TODO check header
      //   const header = req.header("Authorization");
      //   if (header) {
      //      const [TokenType, Token] = header.split(" ");
      //      if (TokenType.trim() !== "Bearer") {
      //         res.status(401).json({ err: "TokenType must be Bearer" });
      //         return;
      //      }
      //      const decoded = jwt.verify(Token.trim(), JWT_SECRET) as JwtPayload;
      //   }
      console.log(1);
      const parseRes = ZAuthenticateRequestSchema.safeParse(req.body);
      if (!parseRes.success) {
         res.status(400).json(parseRes.error);
         return;
      }
      const { email, pwd } = parseRes.data;
      console.log(2);

      try {
         const user = await Users.findOne({ email: email });
         console.log(3);

         if (!user) {
            res.status(404).json({ err: "No such user with this email" });
            return;
         }
         if (await compare(pwd, user.pwdHash)) {
            console.log(4);

            const TOKEN = createToken(user);
            res.status(200).json({
               type: "Bearer",
               token: TOKEN,
            });
         } else {
            res.status(401).json({ err: "Username or Password wrong" });
         }
      } catch (error) {
         res.status(500).json(error);
      }
   };

   return authenticate;
}

export default Authenticate;
