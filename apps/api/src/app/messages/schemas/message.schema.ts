import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import * as mongoose from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type MessageDocument = Message & mongoose.Document;

@Schema()
export class Message extends SchemaBase implements ModelBase<models.Message> {
  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ required: true, type: String })
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: models.User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  receivers: models.User[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
