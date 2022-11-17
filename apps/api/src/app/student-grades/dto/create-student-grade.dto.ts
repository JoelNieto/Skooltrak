import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentGradeDto {
  @ApiProperty({ default: null })
  @IsNotEmpty()
  score: number;

  @ApiProperty({ default: false })
  @IsOptional()
  noGrade: boolean;
}
