import { RequestHandler } from "express";

const RequireJSON: RequestHandler = (req, res, next) => {
   if (!req.is("application/json")) {
      res.status(400);
      res.json({ err: "invalid content type" });
      return next("invalid content-type");
   }
   next();
};

export default RequireJSON;
