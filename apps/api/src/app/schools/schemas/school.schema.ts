import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type SchoolDocument = School & Document;

@Schema()
export class School extends SchemaBase implements ModelBase<models.School> {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  shortName: string;

  @Prop({ type: String })
  logoURL: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: Number, default: new Date().getFullYear() })
  currentYear: number;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  motto: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
