import { ApiProperty } from '@nestjs/swagger';
import { Gender, MedicalInfo, Parent, Student } from '@skooltrak-app/models';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateStudentDto implements DTOBase<Student> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  middleName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  secondSurname: string;

  @ApiProperty({ enum: Gender, enumName: 'Gender' })
  gender: Gender;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: true })
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsDate()
  enrollDate: Date;

  @ApiProperty({ required: false })
  @IsArray()
  guardians: Parent[];

  @ApiProperty({ required: false })
  @IsNotEmpty()
  mother: Parent;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  father: Parent;

  @ApiProperty({ required: true })
  @IsDate()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  medicalInfo: MedicalInfo;
}
