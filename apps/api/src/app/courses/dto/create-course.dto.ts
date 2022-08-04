import { ApiProperty } from '@nestjs/swagger';
import { Course, Degree, LevelEnum, School, StudyPlan, Subject, Teacher } from '@skooltrak-app/models';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateCourseDto implements DTOBase<Course> {
  @ApiProperty()
  @IsNotEmpty()
  subject: Subject;

  @ApiProperty()
  @IsOptional()
  parentSubject?: Subject;

  @ApiProperty()
  @IsOptional()
  teachers: Teacher[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  plan: StudyPlan;

  @ApiProperty()
  @IsOptional()
  degree: Degree;

  @ApiProperty()
  @IsOptional()
  level: LevelEnum;

  @ApiProperty()
  @IsOptional()
  school: School;

  @ApiProperty()
  @IsNumber()
  weeklyHours: number;

  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
