import { ApiProperty } from '@nestjs/swagger';
import {
  ClassGroup,
  Degree,
  Gender,
  LevelEnum,
  MedicalInfo,
  Parent,
  School,
  Student,
  StudyPlan,
  User,
} from '@skooltrak-app/models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateStudentDto implements DTOBase<Student> {
  @ApiProperty()
  @IsOptional()
  school: School;

  @ApiProperty()
  @IsOptional()
  degree: Degree;

  @ApiProperty()
  @IsOptional()
  level: LevelEnum;

  @ApiProperty()
  @IsOptional()
  plan: StudyPlan;

  @ApiProperty()
  @IsOptional()
  profilePicURL: string;

  @ApiProperty()
  @IsOptional()
  group: ClassGroup;

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
  @IsOptional()
  gender: Gender;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  address: string;

  @ApiProperty({ required: true })
  @IsOptional()
  enrollYear: number;

  @ApiProperty({ required: false })
  @IsOptional()
  guardians: Parent[];

  @ApiProperty({ required: false })
  @IsNotEmpty()
  mother: Parent;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  father: Parent;

  @ApiProperty({ required: true })
  @IsOptional()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  medicalInfo: MedicalInfo;

  user: User;
}
