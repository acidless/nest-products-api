import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JWTService } from './JWT/JWT.service';
import { AuthController } from './auth.controller';

/*====================*/

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService, JWTService],
})
export class AuthModule {}
