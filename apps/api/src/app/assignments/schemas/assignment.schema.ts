import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment
  extends SchemaBase
  implements ModelBase<models.Assignment>
{
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StudyPlan' })
  plan?: models.StudyPlan;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  course: models.Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup' })
  group: models.ClassGroup;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserFile' }] })
  documents: models.UserFile[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher?: models.Teacher;

  @Prop({ type: Date, required: false })
  start: Date;

  @Prop({ type: Date, required: true })
  end: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
