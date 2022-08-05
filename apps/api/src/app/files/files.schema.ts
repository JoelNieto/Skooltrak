import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import * as mongoose from 'mongoose';

import { ModelBase, SchemaBase } from '../shared/base.schema';

export type FileDocument = UserFile & mongoose.Document;

@Schema()
export class UserFile extends SchemaBase implements ModelBase<models.UserFile> {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: models.User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  userShared: models.User[];
}

export const FileSchema = SchemaFactory.createForClass(UserFile);
