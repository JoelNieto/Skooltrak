import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import * as mongoose from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';
import { Subject } from '../../subjects/schemas/subject.schemas';

export type CourseDocument = Course & mongoose.Document;

@Schema()
export class Course extends SchemaBase implements ModelBase<models.Course> {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  })
  subject: models.Subject;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  })
  parentSubject?: models.Subject;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }] })
  teachers: models.Teacher[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyPlan',
  })
  plan: models.StudyPlan;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Degree' })
  degree: models.Degree;

  @Prop({ type: String })
  level: models.LevelEnum;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: models.School;

  @Prop({ required: false, type: Number })
  weeklyHours: number;

  @Prop({ required: false, type: Boolean })
  active: boolean;

  @Prop({ required: false, type: String })
  color?: string;

  @Prop({ required: false, type: String })
  icon?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
