
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

const globalErrorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong'

  return res.status(statusCode).json({
    succes: false,
    message: message,
    error: err
  });
}

export default globalErrorHandler;