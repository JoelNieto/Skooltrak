import { ApiProperty } from '@nestjs/swagger';
import { School } from '@skooltrak-app/models';
import { IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateSchoolDto implements DTOBase<School> {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  shortName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  logoURL: string;

  @ApiProperty({ required: false })
  @IsOptional()
  website: string;

  @ApiProperty({ required: false })
  @IsOptional()
  currentYear: number;

  @ApiProperty({ required: false })
  @IsOptional()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  motto: string;
}
