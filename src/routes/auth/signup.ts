import { hash } from "bcrypt";
import { RequestHandler } from "express";
import { Collection, ObjectId } from "mongodb";
import { ZSignUpRequestSchema } from "../../types/ZSignUpRequest";
import { User } from "../../types/ZUser";
import { createToken } from "../../utils/auth";

function SignUp(Users: Collection<User>): RequestHandler {
   const signUp: RequestHandler = async (req, res) => {
      const parseRes = ZSignUpRequestSchema.safeParse(req.body);
      if (!parseRes.success) {
         res.status(400).json(parseRes.error);
         return;
      }
      const { email, name, pwd } = parseRes.data;
      try {
         const pwdHash = await hash(pwd, 10);
         const user: User = {
            _id: new ObjectId(),
            createdAt: new Date(),
            email,
            name,
            pwdHash,
         };
         await Users.insertOne(user);
         const TOKEN = createToken(user);
         res.status(201).json({
            type: "Bearer",
            token: TOKEN,
         });
      } catch (error) {
         res.status(500).json(error);
      }
   };
   return signUp;
}

export default SignUp;
