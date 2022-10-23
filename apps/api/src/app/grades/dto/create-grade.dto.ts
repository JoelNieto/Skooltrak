import { ApiProperty } from '@nestjs/swagger';
import {
  ClassGroup,
  Course,
  Grade,
  GradeType,
  Period,
  Teacher,
} from '@skooltrak-app/models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DTOBase } from '../../shared/base.schema';

export class CreateGradeDto implements DTOBase<Grade> {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  teacher: Teacher;

  @ApiProperty()
  @IsOptional()
  course: Course;

  @ApiProperty()
  @IsNotEmpty()
  period: Period;

  @ApiProperty()
  @IsOptional()
  type: GradeType;

  @ApiProperty()
  @IsOptional()
  date: Date;

  @ApiProperty()
  @IsOptional()
  group: ClassGroup;

  @ApiProperty()
  @IsOptional()
  published: boolean;

  @ApiProperty()
  @IsOptional()
  closed: boolean;
}
