/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import { AppError } from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next) => {
  // Setting the default value
  let statusCode = 500;
  let message = 'Something went wrong'


  let errorSources: TErrorSources = [{
    path: '',
    message: 'Something went wrong',
  }]




  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError?.errorSources

  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
   else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
   else if (err instanceof AppError) {
    
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [{
      path: '',
      message: err.message
    }];
  }
   else if (err instanceof Error) {
    message = err?.message;
    errorSources = [{
      path: '',
      message: err.message
    }];
  }

  return res.status(statusCode).json({
    succes: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
}

export default globalErrorHandler;