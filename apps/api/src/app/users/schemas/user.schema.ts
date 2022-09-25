import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type UserDocument = User & Document;

@Schema()
export class User extends SchemaBase implements ModelBase<models.User> {
  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  displayName: string;

  @Prop({ required: false, type: String })
  email: string;

  @Prop({ required: false, type: String })
  profileURL: string;

  @Prop({
    required: true,
    type: String,
    enum: models.RoleEnum,
    default: models.RoleEnum.Admin,
  })
  role: models.RoleEnum;

  @Prop({ default: false, type: Boolean })
  blocked: boolean;

  @Prop({ required: false, type: Object })
  access?: models.AdminAccess;

  @Prop({ required: true, type: String })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
