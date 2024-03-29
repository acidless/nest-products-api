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
    return this.model.find().select('-products');
  }

  public async getOne(id: string) {
    return this.model.findById(id).populate({
      path: 'products',
      options: {
        limit: 20,
      },
    });
  }

  public async create(data: CategoryCreateDTO) {
    return this.model.create(data);
  }

  public async update(id: string, data: CategoryCreateDTO) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string) {
    const category = await this.model.findById(id);

    return category.deleteOne();
  }
}
