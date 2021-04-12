import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CategoryDocument } from '../../categories/schemas/CategorySchema';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/UserSchema';

/*====================*/

export type ProductDocument = Product & Document;

/*====================*/

@Schema({ versionKey: false })
export class Product {
  @Prop({ required: true, minlength: 3, maxlength: 24, trim: true })
  public name: string;

  @Prop({ required: true, minlength: 5, maxlength: 1000 })
  public description: string;

  @Prop({ type: Number, min: 0, default: 0 })
  public quantity: number;

  @Prop({ required: true, type: Number, min: 1 })
  public price: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  public categories: Array<CategoryDocument>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  public seller: User | string;
}

/*====================*/

export const ProductSchema = SchemaFactory.createForClass(Product);
