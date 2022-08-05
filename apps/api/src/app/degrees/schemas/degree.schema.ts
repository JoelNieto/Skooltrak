import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Degree as model, LevelEnum, School } from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type DegreeDocument = Degree & Document;

@Schema()
export class Degree extends SchemaBase implements ModelBase<model> {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, enum: LevelEnum })
  level: LevelEnum;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: School;

  @Prop({ default: true, type: Boolean })
  active: boolean;
}
export const DegreeSchema = SchemaFactory.createForClass(Degree);
