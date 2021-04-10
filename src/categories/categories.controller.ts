import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import JSendSerializer from 'r-jsend';
import CategoryCreateDTO from './DTOS/CategoryCreateDTO';
import { AdminGuard } from '../guards/admin.guard';

/*====================*/

@Controller('categories')
export class CategoriesController {
  public constructor(
    private categoriesService: CategoriesService,
    private jsendSerializer: JSendSerializer,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll() {
    const categories = await this.categoriesService.getAll();

    return this.jsendSerializer.successResponse(categories).get();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  public async create(@Body() data: CategoryCreateDTO) {
    const category = await this.categoriesService.create(data);

    return this.jsendSerializer.successResponse(category).get();
  }
}
