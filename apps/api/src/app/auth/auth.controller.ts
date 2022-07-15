import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@skooltrak-app/models';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Body() login: LoginDTO,
    @Res() response: Response
  ) {
    const { user } = req;
    const payload = await this.service.login(user);
    const token = this.service.getToken(payload);
    const cookie = this.service.getCookieWithJwtToken(user, token);
    response.setHeader('Set-Cookie', cookie);
    return response.status(200).send({ token, role: user.role });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Request() req: { user: Partial<User> }, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.service.getCookieSignOut());
    return response.status(200).send({});
  }
}
