import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject extends SchemaBase implements ModelBase<models.Subject> {
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @Prop({ type: String })
  shortName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  parent?: models.Subject;

  @Prop({ type: String })
  code?: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
