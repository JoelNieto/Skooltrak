import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'joel@skooltrak.com',
    description: 'User name',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({ example: 'abcd1234', required: true })
  @IsString()
  password: string;
}
