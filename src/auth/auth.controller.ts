import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import JSendSerializer from 'r-jsend';
import { JWTService } from './JWT/JWT.service';
import { Response } from 'express';
import RegisterDTO from './DTOS/RegisterDTO';
import LoginDTO from './DTOS/LoginDTO';
import { AuthService } from './auth.service';

/*====================*/

@Controller('auth')
export class AuthController {
  public constructor(
    private authService: AuthService,
    private userService: UserService,
    private jsendSerializer: JSendSerializer,
    private jwtService: JWTService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Res({ passthrough: true }) response: Response,
    @Body() data: RegisterDTO,
  ) {
    const user = await this.authService.createUser(data);
    const token = this.jwtService.generateToken(
      user.id,
      user.email,
      user.password,
    );

    this.setTokenCookie(response, token);

    return this.jsendSerializer.successResponse(user).get();
  }

  @Post('/login')
  public async logIn(
    @Res({ passthrough: true }) response: Response,
    @Body() data: LoginDTO,
  ) {
    const user = await this.authService.logIn(data);
    const token = this.jwtService.generateToken(
      user.id,
      user.email,
      user.password,
    );

    this.setTokenCookie(response, token);

    return this.jsendSerializer.successResponse(user).get();
  }

  private setTokenCookie(response: Response, token: string) {
    response.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
      path: '/',
    });
  }
}
