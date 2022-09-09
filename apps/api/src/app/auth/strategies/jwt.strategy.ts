import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { pick } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // TODO Add cookie auth
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return pick(payload, [
      '_id',
      'username',
      'email',
      'role',
      'displayName',
      'profileURL',
      'access',
    ]);
  }

  private static extractJWT = (request: Request) =>
    request?.cookies?.Authentication;
}
