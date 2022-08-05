import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type InboxDocument = Inbox & mongoose.Document;

@Schema()
export class Inbox extends SchemaBase implements ModelBase<models.Inbox> {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiver: models.User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Message' })
  message: models.Message;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: models.User;

  @Prop({ type: String })
  subject: string;

  @Prop({ type: String, default: models.InboxStatus.UNREAD })
  status: models.InboxStatus;

  @Prop({ type: Date, default: Date.now })
  arrivalAt: Date;

  @Prop({ type: Date })
  readAt: Date;
}

export const InboxSchema = SchemaFactory.createForClass(Inbox);
