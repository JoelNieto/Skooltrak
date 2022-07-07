import { ApiProperty } from '@nestjs/swagger';
import { Message, User } from '@skooltrak-app/models';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { DTOBase } from '../../shared/base.schema';

export class CreateMessageDto implements DTOBase<Message> {
  @ApiProperty()
  @IsOptional()
  sender: User;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsArray()
  receivers: User[];
}
