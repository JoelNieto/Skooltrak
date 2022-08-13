import { ApiProperty } from '@nestjs/swagger';
import { AssignmentType } from '@skooltrak-app/models';
import { IsBoolean, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateAssignmentTypeDto implements DTOBase<AssignmentType> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  summative: boolean;
}
