import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'app-config.json';
import JSendSerializer from 'r-jsend';
import { AuthModule } from './auth/auth.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';

/*====================*/

@Global()
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${database.login}:${database.password}@cluster0.7zktq.mongodb.net/${database.name}?retryWrites=true&w=majority`,
    ),
    CategoriesModule,
  ],
  providers: [AppService, JSendSerializer],
  exports: [JSendSerializer],
  controllers: [CategoriesController],
})
export class AppModule {}
