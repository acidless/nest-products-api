import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { database } from 'app-config.json';
import JSendSerializer from 'r-jsend';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ProductModule } from './product/product.module';

/*====================*/

@Global()
@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoriesModule,
    MongooseModule.forRoot(
      `mongodb+srv://${database.login}:${database.password}@cluster0.7zktq.mongodb.net/${database.name}?retryWrites=true&w=majority`,
    ),
    ProductModule,
  ],
  providers: [AppService, JSendSerializer, AuthGuard],
  exports: [JSendSerializer, AuthGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
