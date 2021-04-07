import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/UserSchema';
import { Model } from 'mongoose';
import RegisterDTO from './DTOS/RegisterDTO';
import LoginDTO from './DTOS/LoginDTO';
import * as bcrypt from 'bcrypt';
import JSendSerializer from 'r-jsend';

/*====================*/

@Injectable()
export class UserService {
  private USERS_PER_PAGE = 20;

  public constructor(
    private jsendSerializer: JSendSerializer,
    @InjectModel(User.name) private user: Model<UserDocument>,
  ) {}

  public async getAllUsers(page: number) {
    return this.user
      .find()
      .skip(Math.abs(this.USERS_PER_PAGE * (page - 1)))
      .limit(this.USERS_PER_PAGE);
  }

  public async getUserById(id: string) {
    return this.user.findById(id);
  }

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
