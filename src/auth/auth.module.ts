import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JWTService } from './JWT/JWT.service';

/*====================*/

@Module({
  imports: [UserModule],
  providers: [AuthService, JWTService],
})
export class AuthModule {}
