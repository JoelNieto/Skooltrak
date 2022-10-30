import { Prop, Schema } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose from 'mongoose';
import { ModelBase, SchemaBase } from '../../shared/base.schema';

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

  @Prop({ type: mongoose.Schema.Types.Mixed, required: false })
  score: models.Score;

  @Prop({ type: String, required: false })
  comments?: string;
}
