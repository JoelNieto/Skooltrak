import { ApiProperty } from '@nestjs/swagger';
import { Gender, Subject, Teacher, User } from '@skooltrak-app/models';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateTeacherDto implements DTOBase<Teacher> {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  middleName?: string;

  @ApiProperty()
  @IsString()
  surname: string;

  @ApiProperty()
  @IsOptional()
  secondSurname?: string;

  @ApiProperty()
  @IsString()
  documentId: string;

  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  subjects: Subject[];

  @ApiProperty()
  @IsOptional()
  notes: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Gender, enumName: 'Gender' })
  @IsOptional()
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  user: User;
}
