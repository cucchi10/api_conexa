import { Request, Response, NextFunction } from "express"
import { CustomError } from "../utils/customError.handle"
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if (!token) throw new CustomError('No Token found', 403);

    // The token has to start with "Bearer "
    if (token.slice(0, 7) !== 'Bearer ') throw new CustomError('Token is invalid', 401);
    const jwtByUser: string = token.slice(7)
    const isOK = verifyToken(jwtByUser)
    if (!isOK) {
      throw new CustomError('Token has expired', 401);
    }
    req.body.token = req.headers.authorization?.toString()
    next()
  } catch (error) {
    next(error);
  }
}

export { checkJwt }
