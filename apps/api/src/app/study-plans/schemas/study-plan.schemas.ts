import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type StudyPlanDocument = StudyPlan & Document;

@Schema()
export class StudyPlan
  extends SchemaBase
  implements ModelBase<models.StudyPlan>
{
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, enum: models.LevelEnum, type: String })
  level: models.LevelEnum;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Degree' })
  degree: models.Degree;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: models.School;

  @Prop({ default: true, type: Boolean })
  active: boolean;

  @Prop({ enum: models.YearEnum, type: String })
  year: models.YearEnum;
}

export const StudyPlanSchema = SchemaFactory.createForClass(StudyPlan);
