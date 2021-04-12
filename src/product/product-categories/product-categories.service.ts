import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/ProductSchema';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../../categories/schemas/CategorySchema';

/*====================*/

@Injectable()
export class ProductCategoriesService {
  public constructor(
    @InjectModel(Category.name) private category: Model<CategoryDocument>,
    @InjectModel(Product.name) private product: Model<ProductDocument>,
  ) {}

  public async addCategory(productId: string, categoryId: string) {
    const product = await this.product.findById(productId);
    const category = await this.category.findById(categoryId);

    if (
      product.categories.every((category) => category.toString() !== categoryId)
    ) {
      product.categories.push(categoryId as any);
      category.products.push(productId as any);
    }
    await product.save();
    await category.save();

    return product;
  }
}
