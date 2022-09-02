import { ApiProperty } from '@nestjs/swagger';
import {
  Announcement,
  ClassGroup,
  Course,
  Degree,
  School,
  StudyPlan,
  User,
} from '@skooltrak-app/models';
import { IsDateString, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateAnnouncementDto implements DTOBase<Announcement> {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsOptional()
  author: User;

  @ApiProperty()
  @IsDateString()
  activeSince: Date;

  @ApiProperty()
  @IsDateString()
  activeUntil: Date;

  @ApiProperty()
  @IsOptional()
  school?: School;

  @ApiProperty()
  @IsOptional()
  degrees?: Degree[];

  @ApiProperty()
  @IsOptional()
  plans?: StudyPlan[];

  @ApiProperty()
  @IsOptional()
  groups?: ClassGroup[];

  @ApiProperty()
  @IsOptional()
  courses?: Course[];
}
