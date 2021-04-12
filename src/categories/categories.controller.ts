import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import JSendSerializer from 'r-jsend';
import CategoryCreateDTO from './DTOS/CategoryCreateDTO';
import { AdminGuard } from '../guards/admin.guard';
import { Data } from '../decorators/data.decorator';

/*====================*/

const fill = ['name'];

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getOne(@Param('id') id) {
    const category = await this.categoriesService.getOne(id);

    return this.jsendSerializer.successResponse(category).get();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  public async create(@Data(fill) data: CategoryCreateDTO) {
    const category = await this.categoriesService.create(data);

    return this.jsendSerializer.successResponse(category).get();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  public async update(
    @Param('id') id: string,
    @Data(fill) data: CategoryCreateDTO,
  ) {
    const category = await this.categoriesService.update(id, data);

    return this.jsendSerializer.successResponse(category).get();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminGuard)
  public async delete(@Param('id') id: string) {
    return await this.categoriesService.delete(id);
  }
}
