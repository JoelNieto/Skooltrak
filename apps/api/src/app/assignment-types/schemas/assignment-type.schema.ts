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
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, default: false })
  summative: boolean;
}

export const AssignmentsTypeSchema =
  SchemaFactory.createForClass(AssignmentType);
