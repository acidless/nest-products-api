import { Injectable, UnauthorizedException } from '@nestjs/common';
import RegisterDTO from './DTOS/RegisterDTO';
import { User, UserDocument } from '../user/schemas/UserSchema';
import LoginDTO from './DTOS/LoginDTO';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import JSendSerializer from 'r-jsend';

/*====================*/

@Injectable()
export class AuthService {
  public constructor(
    private jsendSerializer: JSendSerializer,
    @InjectModel(User.name) private user: Model<UserDocument>,
  ) {}

  public async createUser(data: RegisterDTO): Promise<UserDocument> {
    const user = await this.user.create(data);

    user.password = undefined;

    return user;
  }

  public async logIn(data: LoginDTO) {
    const user = await this.user
      .findOne({ email: data?.email || '' })
      .select('+password');

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException(
        this.jsendSerializer.failResponse('Incorrect email or password!').get(),
      );
    }

    user.password = undefined;

    return user;
  }
}
