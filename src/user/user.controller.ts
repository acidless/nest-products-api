import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
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

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(@Filter() filter, @Query('p') page: number) {
    const users = await this.userService.getAllUsers(page, filter);

    return this.jsendSerializer.successResponse(users).get();
  }
}
