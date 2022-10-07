import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import * as mongoose from 'mongoose';
import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type GradeTypeDocument = GradeType & mongoose.Document;

@Schema()
export class GradeType
  extends SchemaBase
  implements ModelBase<models.GradeType>
{
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: models.Course;

  @Prop({ type: String, enum: models.GradeTypeEnum, required: true })
  type: models.GradeTypeEnum;

  @Prop({ type: Number, max: 100, min: 1, required: true })
  weighting: number;
}

export const GradeTypeSchema = SchemaFactory.createForClass(GradeType);
