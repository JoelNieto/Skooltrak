import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose from 'mongoose';
import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type GradeDocument = Grade & mongoose.Document;

@Schema()
export class Grade extends SchemaBase implements ModelBase<models.Grade> {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: models.Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: models.Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Period' })
  period: models.Period;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GradeType' })
  type: models.GradeType;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup' })
  group: models.ClassGroup;

  @Prop({ type: Boolean, default: false })
  published: boolean;

  @Prop({ type: Boolean, default: false })
  closed: boolean;
}

export const GradeSchema = SchemaFactory.createForClass(Grade);
