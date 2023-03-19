import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.message && typeof error.message === 'object') {
    return res.status(error.status || error.code || 500)
      .json({
        code: error.status || error.code || 500,
        message: null,
        success: false,
        errors: error.message,
      });
  }

  // treat as 404
  if (
    error.message &&
    (~error.message.indexOf('not found') || (~error.message.indexOf('Cast to ObjectId failed')))
  ) {
    return next();
  }

  if (error.code === 11000 || error.code === 11001) {
    return res.status(412).json({
      code: 412,
      message: `The ${error.keyValue} is already in use`,
      success: false,
      data: [],
    });
  }

  // error as json
  return res.status(error.status || error.code || 500)
    .json({
      code: error.status || error.code || 500,
      message: error.message || 'Something went wrong',
      success: false,
      data: [],
    });
}