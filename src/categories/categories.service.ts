import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/CategorySchema';
import CategoryCreateDTO from './DTOS/CategoryCreateDTO';

/*====================*/

@Injectable()
export class CategoriesService {
  public constructor(
    @InjectModel(Category.name) private model: Model<CategoryDocument>,
  ) {}

  public async getAll() {
    return this.model.find();
  }

  public async create(data: CategoryCreateDTO) {
    return this.model.create(data);
  }

  public async delete(id: string) {
    const category = await this.model.findById(id);

    return category.deleteOne();
  }
}
