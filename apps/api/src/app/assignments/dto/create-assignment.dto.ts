import { ApiProperty } from '@nestjs/swagger';
import {
  Assignment,
  ClassGroup,
  Course,
  StudyPlan,
  Teacher,
  UserFile,
} from '@skooltrak-app/models';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateAssignmentDto implements DTOBase<Assignment> {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  plan?: StudyPlan;

  @ApiProperty()
  @IsNotEmpty()
  course: Course;

  @ApiProperty()
  @IsNotEmpty()
  group: ClassGroup;

  @ApiProperty()
  @IsOptional()
  documents: UserFile[];

  @ApiProperty()
  @IsOptional()
  teacher?: Teacher;

  @ApiProperty()
  @IsOptional()
  start: Date;

  @ApiProperty()
  @IsDate()
  end: Date;
}
