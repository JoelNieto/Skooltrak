import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(body: any, username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user.role === 'teacher') {
      const teacher = await this.authService.getTeacher(user._id);
      Logger.log({ user, person: { teacher } }, 'teacher');
    }
    return user;
  }
}
