import { ApiProperty } from '@nestjs/swagger';
import { Score } from '@skooltrak-app/models';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentGradeDto {
  @ApiProperty({ default: 'NA' })
  @IsNotEmpty()
  score: Score;
}
