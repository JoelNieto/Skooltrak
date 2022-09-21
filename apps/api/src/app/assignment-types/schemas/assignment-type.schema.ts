import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Document } from 'mongoose';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

export type AssignmentTypeDocument = AssignmentType & Document;

@Schema()
export class AssignmentType
  extends SchemaBase
  implements ModelBase<models.AssignmentType>
{
  createdBy?: models.User;
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, default: false })
  summative: boolean;

  @Prop({ required: true, default: 'blue' })
  color: 'red' | 'yellow' | 'blue';
}

export const AssignmentsTypeSchema =
  SchemaFactory.createForClass(AssignmentType);
