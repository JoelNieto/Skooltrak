import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type ClassGroupDocument = ClassGroup & Document;

@Schema()
export class ClassGroup
  extends SchemaBase
  implements ModelBase<models.ClassGroup>
{
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StudyPlan' })
  plan: models.StudyPlan;

  @Prop({ type: String, enum: models.LevelEnum })
  level: models.LevelEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Degree' })
  degree: models.Degree;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: models.School;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  counselor: models.Teacher;
}

export const ClassGroupSchema = SchemaFactory.createForClass(ClassGroup);
