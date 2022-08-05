import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Document, Types } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type TeacherDocument = Teacher & Document;
@Schema()
export class Teacher extends SchemaBase implements ModelBase<models.Teacher> {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: false, type: String })
  middleName?: string;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ required: false, type: String })
  secondSurname?: string;

  @Prop({ required: true, type: String, unique: true })
  documentId: string;

  @Prop({ required: false, type: Date })
  birthDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  subjects: models.Subject[];

  @Prop({ type: String })
  notes: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, enum: models.Gender })
  gender: models.Gender;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: models.User;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
