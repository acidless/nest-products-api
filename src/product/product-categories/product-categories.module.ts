import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';

/*====================*/

@Module({
  providers: [ProductCategoriesService],
  exports: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
