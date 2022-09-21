import { ApiProperty } from '@nestjs/swagger';
import {
  Assignment,
  AssignmentType,
  ClassGroup,
  Course,
  StudyPlan,
  Teacher,
  User,
  UserFile,
} from '@skooltrak-app/models';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;

  @ApiProperty()
  @IsNotEmpty()
  type: AssignmentType;

  @ApiProperty()
  @IsOptional()
  createdBy: User;
}
