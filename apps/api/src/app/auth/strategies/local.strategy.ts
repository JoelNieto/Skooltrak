import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RoleEnum } from '@skooltrak-app/models';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(body: any, username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user.role === RoleEnum.Teacher) {
      const teacher = await this.authService.getTeacher(user._id);
      return { user, person: { teacher } };
    }

    if (user.role === RoleEnum.Student) {
      const student = await this.authService.getStudent(user._id);
      return { user, person: { student } };
    }

    return { user };
  }
}
