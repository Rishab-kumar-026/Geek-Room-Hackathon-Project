import { Request, Response, NextFunction } from 'express';

interface Error {
  statusCode?: number;
  message: string;
  stack?: string;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Mongoose bad ObjectId
  if (error.message.includes('Cast to ObjectId failed')) {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Mongoose duplicate key
  if (error.message.includes('E11000')) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  // Mongoose validation error
  if (error.message.includes('validation failed')) {
    statusCode = 400;
    message = 'Validation error';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};