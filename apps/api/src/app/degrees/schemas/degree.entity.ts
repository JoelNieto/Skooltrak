import { Schema } from '@nestjs/mongoose';
import { Degree as model, LevelEnum, School } from '@skooltrak-app/models';

import { ModelBase, SchemaBase } from '../../shared/base.schema';

@Schema()
export class Degree extends SchemaBase implements ModelBase<model> {
  name: string;
  level: LevelEnum;
  school: School;
  active: boolean;
}
