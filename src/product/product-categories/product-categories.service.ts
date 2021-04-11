import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/ProductSchema';
import { Model } from 'mongoose';

/*====================*/

@Injectable()
export class ProductCategoriesService {
  public constructor(
    @InjectModel(Product.name) private product: Model<ProductDocument>,
  ) {}

  public async addCategory(productId: string, categoryId: string) {
    const product = await this.product.findById(productId);

    if (
      product.categories.every((category) => category.toString() !== categoryId)
    ) {
      product.categories.push(categoryId as any);
    }
    await product.save();

    return product;
  }
}
