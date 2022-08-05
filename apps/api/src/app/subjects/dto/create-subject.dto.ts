import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '@skooltrak-app/models';
import { IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateSubjectDto implements DTOBase<Subject> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  shortName: string;

  @ApiProperty()
  @IsOptional()
  parent?: Subject;

  @ApiProperty()
  @IsOptional()
  code?: string;
}
