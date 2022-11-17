import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';
import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type StudentGradeDocument = StudentGrade & Document;

@Schema()
export class StudentGrade
  extends SchemaBase
  implements ModelBase<models.StudentGrade>
{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: models.Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true })
  grade: models.Grade;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  })
  student: models.Student;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true })
  period: models.Period;

  @Prop({ type: Number, required: false })
  score: number;

  @Prop({ type: String, required: false })
  comments?: string;

  @Prop({ type: Boolean, default: false })
  noGrade: boolean;
}

export const StudentGradeSchema = SchemaFactory.createForClass(StudentGrade);
