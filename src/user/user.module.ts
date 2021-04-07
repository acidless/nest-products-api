import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/UserSchema';
import JSendSerializer from 'r-jsend';
import { JWTService } from '../JWT/JWT.service';

/*====================*/

@Module({
  controllers: [UserController],
  providers: [UserService, JSendSerializer, JWTService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
