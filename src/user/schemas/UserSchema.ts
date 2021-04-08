import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
}

/*====================*/

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }

  next();
});

UserSchema.methods.hideData = async function (this: UserDocument) {
  Object.keys(this.schema.paths).forEach((key) => {
    let value = this.schema.paths[key];

    if (value.options.select === false) {
      value = undefined;
    }
  });
};
