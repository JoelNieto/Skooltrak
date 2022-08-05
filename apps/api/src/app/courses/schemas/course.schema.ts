import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Document, Types } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course extends SchemaBase implements ModelBase<models.Course> {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Subject' })
  subject: models.Subject;

  @Prop({ required: false, type: Types.ObjectId, ref: 'Subject' })
  parentSubject?: models.Subject;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Teacher' }] })
  teachers: models.Teacher[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'StudyPlan' })
  plan: models.StudyPlan;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Degree' })
  degree: models.Degree;

  @Prop({ type: String })
  level: models.LevelEnum;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: models.School;

  @Prop({ required: false, type: Number })
  weeklyHours: number;

  @Prop({ required: false, type: Boolean })
  active: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
