import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import softDeletes from '../../mongoose/plugins/SoftDeletes';
import * as mongoose from 'mongoose';
import { ProductDocument } from '../../product/schemas/ProductSchema';

/*====================*/

export type CategoryDocument = Category & Document;

/*====================*/

@Schema({ versionKey: false })
export class Category {
  @Prop({ required: true, unique: true, minlength: 3, maxlength: 16 })
  public name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  public products: Array<ProductDocument>;
}

/*====================*/

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(softDeletes);
