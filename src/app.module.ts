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
import { Product, ProductSchema } from './product/schemas/ProductSchema';
import { Category, CategorySchema } from './categories/schemas/CategorySchema';
import { User, UserSchema } from './user/schemas/UserSchema';
import { TransactionsModule } from './transactions/transactions.module';
import {
  Transaction,
  TransactionSchema,
} from './transactions/schemas/TransactionSchema';

/*====================*/

const models = MongooseModule.forFeature([
  { name: Product.name, schema: ProductSchema },
  { name: Category.name, schema: CategorySchema },
  { name: User.name, schema: UserSchema },
  { name: Transaction.name, schema: TransactionSchema },
]);

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
    models,
    TransactionsModule,
  ],
  providers: [AppService, JSendSerializer, AuthGuard],
  exports: [models, JSendSerializer, AuthGuard, ProductModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
