import { ApiProperty } from '@nestjs/swagger';
import { AdminAccess, RoleEnum, User } from '@skooltrak-app/models';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateUserDto implements DTOBase<User> {
  @ApiProperty({ required: true, example: 'user.name' })
  @IsString()
  username: string;

  @ApiProperty({ required: true, example: 'John Doe' })
  @IsString()
  displayName: string;

  @ApiProperty({ example: 'user@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  profileURL: string;

  @ApiProperty({ enum: RoleEnum })
  @IsNotEmpty()
  role: RoleEnum;

  @ApiProperty({ default: false })
  @IsBoolean()
  blocked: boolean;

  @ApiProperty()
  @IsOptional()
  access?: AdminAccess;

  @ApiProperty({ required: true, minLength: 8 })
  @IsString()
  password: string;
}
