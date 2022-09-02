import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import mongoose, { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type AnnouncementDocument = Announcement & Document;

@Schema()
export class Announcement
  extends SchemaBase
  implements ModelBase<models.Announcement>
{
  @Prop({ required: true, type: String })
  text: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: models.User;

  @Prop({ required: true, type: Date })
  activeSince: Date;

  @Prop({ required: true, type: Date })
  activeUntil: Date;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  })
  school?: models.School;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  })
  degrees?: models.Degree[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudyPlan' }] })
  plans?: models.StudyPlan[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup' }] })
  groups?: models.ClassGroup[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses?: models.Course[];
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
