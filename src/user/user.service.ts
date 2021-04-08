import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/UserSchema';
import { Model } from 'mongoose';
import JSendSerializer from 'r-jsend';

/*====================*/

@Injectable()
export class UserService {
  private USERS_PER_PAGE = 20;

  public constructor(
    private jsendSerializer: JSendSerializer,
    @InjectModel(User.name) private user: Model<UserDocument>,
  ) {}

  public async getAllUsers(page: number, filter: any) {
    return this.user
      .find(filter)
      .skip(Math.abs(this.USERS_PER_PAGE * (page - 1)))
      .limit(this.USERS_PER_PAGE);
  }

  public async getUserById(id: string) {
    return this.user.findById(id);
  }
}
