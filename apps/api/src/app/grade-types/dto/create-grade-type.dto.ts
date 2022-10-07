import { ApiProperty } from '@nestjs/swagger';
import { Course, GradeType, GradeTypeEnum } from '@skooltrak-app/models';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DTOBase } from '../../shared/base.schema';

export class CreateGradeTypeDto implements DTOBase<GradeType> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  course: Course;

  @ApiProperty({ enum: GradeTypeEnum, required: true })
  @IsNotEmpty()
  type: GradeTypeEnum;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  weighting: number;
}
