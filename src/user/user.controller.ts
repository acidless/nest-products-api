import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import JSendSerializer from 'r-jsend';

/*====================*/

@Controller('users')
export class UserController {
  public constructor(
    private userService: UserService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(@Query('p') page: number) {
    const users = await this.userService.getAllUsers(page);

    return this.jsendSerializer.successResponse(users).get();
  }
}
