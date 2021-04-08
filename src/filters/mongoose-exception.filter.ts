import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'mongoose';
import { Response } from 'express';
import { MongoError } from 'mongodb';

/*====================*/

@Catch(Error.CastError, Error.ValidationError, MongoError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(
    exception: Error.CastError | Error.ValidationError | MongoError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();
    const message = exception.message;

    response.status(HttpStatus.BAD_REQUEST).json({
      success: 'fail',
      message,
    });
  }
}
