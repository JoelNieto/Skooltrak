import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Document, Schema as mongoSchema } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type StudentDocument = Student & Document;
@Schema()
export class Student extends SchemaBase implements ModelBase<models.Student> {
  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: false, type: String })
  middleName: string;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ required: false, type: String })
  secondSurname: string;

  @Prop({ required: true, unique: true })
  documentId: string;

  @Prop({ required: true, type: String, enum: models.Gender })
  gender: models.Gender;

  @Prop({ required: false, type: String })
  email?: string;

  @Prop({ required: false, type: String })
  address: string;

  @Prop({ type: Date })
  enrollDate: Date;

  @Prop({ required: false })
  guardians: models.Parent[];

  @Prop({ required: false, type: mongoSchema.Types.Mixed })
  mother: models.Parent;

  @Prop({ required: false, type: mongoSchema.Types.Mixed })
  father: models.Parent;

  @Prop({ required: true, type: Date })
  birthDate: Date;

  @Prop({ required: false, type: mongoSchema.Types.Mixed })
  medicalInfo: models.MedicalInfo;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
