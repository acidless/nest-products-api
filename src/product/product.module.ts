import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

/*====================*/

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [ProductCategoriesModule],
  exports: [ProductService],
})
export class ProductModule {}
