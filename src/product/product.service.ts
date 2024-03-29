import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/ProductSchema';
import { Model } from 'mongoose';
import { CreateProductDTO } from './DTOS/CreateProductDTO';
import { CategoryDocument } from '../categories/schemas/CategorySchema';
import { User, UserDocument } from '../user/schemas/UserSchema';

/*====================*/

@Injectable()
export class ProductService {
  private PRODUCTS_PER_PAGE = 30;

  public constructor(
    @InjectModel(User.name) private user: Model<UserDocument>,
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
    const user = await this.user.findById(sellerId);
    const product = await this.product.create(data);

    product.seller = sellerId;
    user.products.push(product._id);

    await product.save();
    await user.save({ validateModifiedOnly: true });

    return product;
  }

  public async update(id: string, data: CreateProductDTO, sellerId?: string) {
    return this.product.findOneAndUpdate({ _id: id, seller: sellerId }, data, {
      new: true,
    });
  }

  public async delete(id: string, sellerId?: string) {
    return this.product.findOneAndUpdate({ _id: id, seller: sellerId });
  }
}
