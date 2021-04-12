import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import JSendSerializer from 'r-jsend';
import { AuthGuard } from '../../guards/auth.guard';

/*====================*/

@Controller('me')
@UseGuards(AuthGuard)
export class MeController {
  public constructor(private jsendSerializer: JSendSerializer) {}

  @Get()
  public async me(@Req() request) {
    return this.jsendSerializer.successResponse(request.user).get();
  }
}
