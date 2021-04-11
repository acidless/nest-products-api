import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import JSendSerializer from 'r-jsend';

/*====================*/

@Controller('me')
export class MeController {
  public constructor(private jsendSerializer: JSendSerializer) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async me(@Req() request) {
    if (request.user?.id) {
      return this.jsendSerializer.successResponse(request.user).get();
    }

    throw new UnauthorizedException(
      this.jsendSerializer
        .failResponse('You must be authorized to do this')
        .get(),
    );
  }
}
