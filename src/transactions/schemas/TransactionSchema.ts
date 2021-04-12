import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ProductDocument } from '../../product/schemas/ProductSchema';
import { UserDocument } from '../../user/schemas/UserSchema';
import { Document } from 'mongoose';

/*====================*/

export type TransactionDocument = Transaction & Document;

/*====================*/

@Schema({ versionKey: false })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  public product: ProductDocument;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  public buyer: UserDocument;

  @Prop({ type: Date, required: true })
  public date: Date;
}

/*====================*/

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
