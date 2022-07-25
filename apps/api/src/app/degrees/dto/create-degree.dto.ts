import { ApiProperty } from '@nestjs/swagger';
import { Degree, LevelEnum, School } from '@skooltrak-app/models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateDegreeDto implements DTOBase<Degree> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ enum: LevelEnum, enumName: 'level' })
  @IsNotEmpty()
  level: LevelEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  school: School;

  @ApiProperty({ default: true })
  @IsOptional()
  active: boolean;
}
