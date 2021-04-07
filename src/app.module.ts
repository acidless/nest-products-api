import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'app-config.json';
import JSendSerializer from 'r-jsend';
import { AuthModule } from './auth/auth.module';

/*====================*/

@Global()
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${database.login}:${database.password}@cluster0.7zktq.mongodb.net/${database.name}?retryWrites=true&w=majority`,
    ),
  ],
  providers: [AppService, JSendSerializer],
  exports: [JSendSerializer],
})
export class AppModule {}
