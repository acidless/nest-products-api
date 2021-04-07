import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import RegisterDTO from './DTOS/RegisterDTO';
import { UserService } from './user.service';
import JSendSerializer from 'r-jsend';
import { JWTService } from '../JWT/JWT.service';
import { Response } from 'express';
import LoginDTO from './DTOS/LoginDTO';

/*====================*/

@Controller('users')
export class UserController {
  public constructor(
    private userService: UserService,
    private jsendSerializer: JSendSerializer,
    private jwtService: JWTService,
  ) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  public async me(@Req() request) {
    if (request.user?.id) {
      const user = await this.userService.getUserById(request.user?.id);

      return this.jsendSerializer.successResponse(user).get();
    }

    throw new UnauthorizedException(
      this.jsendSerializer
        .failResponse('You must be authorized to do this')
        .get(),
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(@Query('p') page: number) {
    const users = await this.userService.getAllUsers(page);

    return this.jsendSerializer.successResponse(users).get();
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Res({ passthrough: true }) response: Response,
    @Body() data: RegisterDTO,
  ) {
    const user = await this.userService.createUser(data);
    const token = this.jwtService.generateToken(
      user.id,
      user.email,
      user.password,
    );

    this.setTokenCookie(response, token);

    return user;
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async logIn(
    @Res({ passthrough: true }) response: Response,
    @Body(ValidationPipe) data: LoginDTO,
  ) {
    const user = await this.userService.logIn(data);
    const token = this.jwtService.generateToken(
      user.id,
      user.email,
      user.password,
    );

    this.setTokenCookie(response, token);

    return user;
  }

  private setTokenCookie(response: Response, token: string) {
    response.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      path: '/',
    });
  }
}
