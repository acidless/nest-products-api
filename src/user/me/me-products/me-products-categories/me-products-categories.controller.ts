import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductGuard } from '../../../../guards/product.guard';
import { ProductCategoriesService } from '../../../../product/product-categories/product-categories.service';
import JSendSerializer from 'r-jsend';

/*====================*/

@Controller()
export class MeProductsCategoriesController {
  public constructor(
    private productCategoriesService: ProductCategoriesService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Post('/me/products/:productId/categories/:categoryId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ProductGuard)
  async addCategory(@Param() params) {
    const product = await this.productCategoriesService.addCategory(
      params.productId,
      params.categoryId,
    );

    return this.jsendSerializer.successResponse(product).get();
  }
}
