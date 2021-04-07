import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'app-config.json';

/*====================*/

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${database.login}:${database.password}@cluster0.7zktq.mongodb.net/${database.name}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
