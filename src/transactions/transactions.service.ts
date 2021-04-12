import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/TransactionSchema';
import { Model } from 'mongoose';

/*====================*/

@Injectable()
export class TransactionsService {
  private PAGE_SIZE = 50;

  public constructor(
    @InjectModel(Transaction.name)
    private transaction: Model<TransactionDocument>,
  ) {}

  public async getAll(page, filter) {
    return this.transaction
      .find(filter)
      .skip(Math.abs(this.PAGE_SIZE * (page - 1)))
      .limit(this.PAGE_SIZE);
  }

  public async create(productId: string, buyerId: string) {
    const transaction = await this.transaction.create({ date: new Date() });
    transaction.product = productId as any;
    transaction.buyer = buyerId as any;

    await transaction.save();

    return transaction;
  }

  public async getOneById(id: string, buyerId: string) {
    return this.transaction
      .findOne({ _id: id, buyer: buyerId as any })
      .populate({
        path: 'buyer',
        select: '-products',
      })
      .populate('product');
  }

  public async delete(id: string, buyerId: string) {
    return this.transaction.findOneAndDelete({ id: id, buyer: buyerId as any });
  }
}
