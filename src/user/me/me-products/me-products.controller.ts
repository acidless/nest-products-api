import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import JSendSerializer from 'r-jsend';
import { ProductService } from '../../../product/product.service';
import { Filter } from '../../../decorators/filter.decorator';
import { AuthGuard } from '../../../guards/auth.guard';
import { Data } from '../../../decorators/data.decorator';
import { CreateProductDTO } from '../../../product/DTOS/CreateProductDTO';
import { ProductGuard } from '../../../guards/product.guard';

/*====================*/

const fill = ['name', 'description', 'price', 'quantity', 'seller'];

@Controller('me/products')
export class MeProductsController {
  public constructor(
    private jsendSerializer: JSendSerializer,
    private productService: ProductService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async myProducts(@Query('p') page, @Filter() filter, @Req() request) {
    const newFilter = { ...filter, seller: request.user._id };

    const products = await this.productService.getAll(page || 1, newFilter);

    return this.jsendSerializer.successResponse(products).get();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  public async create(@Req() request, @Data(fill) data: CreateProductDTO) {
    const product = await this.productService.create(request.user._id, data);

    return this.jsendSerializer.successResponse(product).get();
  }

  @Patch(':productId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, ProductGuard)
  public async update(
    @Param(':productId') id: string,
    @Data(fill) data: CreateProductDTO,
  ) {
    const product = await this.productService.update(id, data);

    return this.jsendSerializer.successResponse(product).get();
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, ProductGuard)
  public async delete(@Param(':productId') id: string) {
    return await this.productService.delete(id);
  }
}
