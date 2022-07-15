import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';

import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly jwt: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.model
      .findOne({ $or: [{ username: username }, { email: username }] })
      .populate('role');

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (await compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async login(user: UserDocument) {
    const { email, username, displayName, role, access, profileURL } = user;
    return { email, username, displayName, role, profileURL, access };
  }

  public getToken(payload: Partial<User>) {
    return this.jwt.sign(payload);
  }

  public getCookieWithJwtToken(payload: Partial<User>, token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION'
    )}`;
  }

  public getCookieSignOut() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }
}
