import { Module } from '@nestjs/common';
import { MeProductsController } from './me-products.controller';
import { ProductModule } from '../../../product/product.module';
import { MeProductsCategoriesModule } from './me-products-categories/me-products-categories.module';

/*====================*/

@Module({
  imports: [ProductModule, MeProductsCategoriesModule],
  controllers: [MeProductsController],
})
export class MeProductsModule {}
