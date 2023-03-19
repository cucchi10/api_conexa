import { NextFunction, Request, Response } from 'express';
import { authUrl } from '../utils/constants'
import { CustomError } from '../utils/customError.handle';

const allowedOrigins = [authUrl];

const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { origin } = req.headers;
    if (!origin) throw new CustomError('Forbidden', 403);

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      throw new CustomError('Forbidden', 403);
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { checkOrigin }