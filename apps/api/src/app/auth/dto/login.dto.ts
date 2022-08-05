import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'joel@nieto.com',
    description: 'User name',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({ example: 'abcd1234', required: true })
  @IsString()
  password: string;
}
