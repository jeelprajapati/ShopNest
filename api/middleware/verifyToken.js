import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {

    const Token = req.headers?.authorization?.split(" ")[1];
    if (!Token) return next(createError(401, "Unauthorized user!"));
    jwt.verify(Token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).send(createError(403, "Invalid Token"));
      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      try {
        if (req.user?.isAdmin) {
          next();
        } else {
          res.status(403).send(createError(403, "You can not able to do this"));
        }
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};
