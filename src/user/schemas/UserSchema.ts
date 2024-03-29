import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import hideData from '../../mongoose/plugins/HideData';
import softDeletes from '../../mongoose/plugins/SoftDeletes';
import * as mongoose from 'mongoose';
import { ProductDocument } from '../../product/schemas/ProductSchema';

/*====================*/

export type UserDocument = User &
  Document & {
    hideData: () => void;
  };

/*====================*/

@Schema({ versionKey: false })
export class User {
  @Prop({
    required: true,
    minlength: 3,
    trim: true,
    maxlength: 16,
  })
  public name: string;

  @Prop({
    required: true,
    validate: {
      validator: function (val) {
        return /^.+@.+\..+$/.test(val);
      },
      message: 'Invalid email',
    },
    unique: true,
  })
  public email: string;

  @Prop({ required: true, minLength: 6, maxLength: 32, select: false })
  public password: string;

  @Prop({
    required: true,
    minLength: 6,
    maxLength: 32,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
    },
  })
  public passwordConfirm: string;

  @Prop({ default: false, select: false })
  public isAdmin: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  public products: Array<ProductDocument>;
}

/*====================*/

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(hideData);
UserSchema.plugin(softDeletes);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  next();
});
