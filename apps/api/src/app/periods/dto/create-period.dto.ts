import { ApiProperty } from '@nestjs/swagger';
import { Period, School } from '@skooltrak-app/models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DTOBase } from '../../shared/base.schema';

export class CreatePeriodDto implements DTOBase<Period> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  sort: number;

  @ApiProperty()
  @IsNotEmpty()
  school: School;

  @ApiProperty()
  @IsOptional()
  startDate: Date;

  @ApiProperty()
  @IsOptional()
  endDate: Date;
}
