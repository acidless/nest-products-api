import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/UserSchema';
import { JWTService } from '../auth/JWT/JWT.service';

/*====================*/

const models = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);

/*====================*/

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [models],
  exports: [UserService, models],
})
export class UserModule {}
