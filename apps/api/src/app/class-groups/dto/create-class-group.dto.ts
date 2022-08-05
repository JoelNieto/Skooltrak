import { ApiProperty } from '@nestjs/swagger';
import { ClassGroup, Degree, LevelEnum, School, StudyPlan, Teacher } from '@skooltrak-app/models';
import { IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateClassGroupDto implements DTOBase<ClassGroup> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  plan: StudyPlan;

  @ApiProperty()
  @IsOptional()
  level: LevelEnum;

  @ApiProperty()
  @IsOptional()
  degree: Degree;

  @ApiProperty()
  @IsOptional()
  school: School;

  @ApiProperty()
  @IsOptional()
  counselor: Teacher;
}
