import { Module } from '@nestjs/common';
import { MeProductsCategoriesController } from './me-products-categories.controller';
import { ProductCategoriesModule } from '../../../../product/product-categories/product-categories.module';

@Module({
  imports: [ProductCategoriesModule],
  controllers: [MeProductsCategoriesController],
})
export class MeProductsCategoriesModule {}
