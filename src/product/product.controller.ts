import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import JSendSerializer from 'r-jsend';
import { Filter } from '../decorators/filter.decorator';

/*====================*/

@Controller('products')
export class ProductController {
  public constructor(
    private productService: ProductService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Get()
  public async getAll(@Query('p') page, @Filter() filter) {
    const products = await this.productService.getAll(page || 1, filter);

    return this.jsendSerializer.successResponse(products).get();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    const product = await this.productService.getOne(id);

    return this.jsendSerializer.successResponse(product).get();
  }
}
