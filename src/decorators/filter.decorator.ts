import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/*====================*/

export const Filter = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const query = ctx.switchToHttp().getRequest<Request>().query;

    const exclude = ['p', 'sortBy'];

    exclude.forEach((item) => delete query[item]);

    const queryStr = JSON.stringify(query).replace(
      /\b(gte|gt|lte|lt)\b/,
      (match) => `$${match}`,
    );

    return JSON.parse(queryStr);
  },
);
