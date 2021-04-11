import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import JSendSerializer from 'r-jsend';
import { Filter } from '../decorators/filter.decorator';

/*====================*/

@Controller('users')
export class UserController {
  public constructor(
    private userService: UserService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Get('/me')
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

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(@Filter() filter, @Query('p') page: number) {
    const users = await this.userService.getAllUsers(page || 1, filter);

    return this.jsendSerializer.successResponse(users).get();
  }
}
