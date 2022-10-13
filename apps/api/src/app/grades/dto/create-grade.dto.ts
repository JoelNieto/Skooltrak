import { ApiProperty } from '@nestjs/swagger';
import {
  ClassGroup,
  Course,
  Grade,
  GradeType,
  Period,
  Teacher,
} from '@skooltrak-app/models';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  groups: ClassGroup[];

  @ApiProperty()
  @IsBoolean()
  published: boolean;

  @ApiProperty()
  @IsBoolean()
  closed: boolean;
}
