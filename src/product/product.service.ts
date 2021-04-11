import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/ProductSchema';
import { Model } from 'mongoose';
import { CreateProductDTO } from './DTOS/CreateProductDTO';
import { CategoryDocument } from '../categories/schemas/CategorySchema';

/*====================*/

@Injectable()
export class ProductService {
  private PRODUCTS_PER_PAGE = 30;

  public constructor(
    @InjectModel(Product.name) private product: Model<ProductDocument>,
  ) {}

  public async getAll(page: number, filter) {
    return this.product
      .find(filter)
      .skip(Math.abs(this.PRODUCTS_PER_PAGE * (page - 1)))
      .limit(this.PRODUCTS_PER_PAGE)
      .populate({
        path: 'categories',
        transform: (doc: CategoryDocument) => {
          return doc.name;
        },
      })
      .select('-description');
  }

  public async getOne(id: string) {
    return this.product.findById(id).populate('categories').populate({
      path: 'seller',
      select: '_id name',
    });
  }

  public async create(sellerId: string, data: CreateProductDTO) {
    const product = await this.product.create(data);
    product.seller = sellerId;
    await product.save();

    return product;
  }

  public async update(id: string, data: CreateProductDTO) {
    return this.product.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string) {
    return this.product.findByIdAndDelete(id);
  }
}
