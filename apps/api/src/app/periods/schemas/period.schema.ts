import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose from 'mongoose';
import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type PeriodDocument = Period & mongoose.Document;

@Schema()
export class Period extends SchemaBase implements ModelBase<models.Period> {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number })
  sort: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school: models.School;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const PeriodSchema = SchemaFactory.createForClass(Period);
