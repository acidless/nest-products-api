import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

/*====================*/

export type UserDocument = User & Document;

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
