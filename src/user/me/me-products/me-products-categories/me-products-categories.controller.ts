import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProductCategoriesService } from '../../../../product/product-categories/product-categories.service';
import JSendSerializer from 'r-jsend';
import { AuthGuard } from '../../../../guards/auth.guard';

/*====================*/

@Controller()
@UseGuards(AuthGuard)
export class MeProductsCategoriesController {
  public constructor(
    private productCategoriesService: ProductCategoriesService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Post('/me/products/:productId/categories/:categoryId')
  async addCategory(@Req() request, @Param() params) {
    const product = await this.productCategoriesService.addCategory(
      params.productId,
      params.categoryId,
      request.user._id,
    );

    return this.jsendSerializer.successResponse(product).get();
  }
}
