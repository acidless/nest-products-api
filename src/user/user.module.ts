import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MeModule } from './me/me.module';

/*====================*/

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MeModule],
  exports: [UserService],
})
export class UserModule {}
