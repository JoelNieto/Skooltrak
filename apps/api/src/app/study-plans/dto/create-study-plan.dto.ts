import { ApiProperty } from '@nestjs/swagger';
import { Degree, LevelEnum, School, StudyPlan, YearEnum } from '@skooltrak-app/models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateStudyPlanDto implements DTOBase<StudyPlan> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ enum: LevelEnum, enumName: 'Levels' })
  @IsString()
  level: LevelEnum;

  @ApiProperty()
  @IsNotEmpty()
  degree: Degree;

  @ApiProperty({ enum: YearEnum })
  @IsString()
  year: YearEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  school: School;

  @ApiProperty()
  @IsOptional()
  active: boolean;
}
