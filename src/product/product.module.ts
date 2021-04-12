import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductTransactionsModule } from './product-transactions/product-transactions.module';

/*====================*/

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [ProductCategoriesModule, ProductTransactionsModule],
  exports: [ProductService],
})
export class ProductModule {}
