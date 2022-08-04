import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private readonly config: ConfigService,
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
    const { _id, email, username, displayName, role, access, profileURL } =
      user;
    return { _id, email, username, displayName, role, profileURL, access };
  }

  public getToken(payload: Partial<User>) {
    return this.jwt.sign(payload);
  }

  public getCookieWithJwtToken(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.config.get(
      'JWT_EXPIRATION'
    )}`;
  }

  public getCookieSignOut() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }

  async changeAvatar(
    image: {
      dataBuffer: Buffer;
      filename: string;
      type: string;
    },
    id: string
  ) {
    const s3Client = new S3({
      endpoint: `https://${this.config.get('S3_ENDPOINT')}`,
      region: this.config.get('S3_REGION'),
      credentials: {
        accessKeyId: this.config.get('S3_KEY'),
        secretAccessKey: this.config.get('S3_SECRET'),
      },
    });

    const key = `avatars/${uuid()}-${image.filename}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.get('S3_BUCKET'),
        Body: image.dataBuffer,
        Key: key,
        ContentType: image.type,
        ACL: 'public-read',
      })
    );

    const profile = this.model
      .findByIdAndUpdate(id, {
        $set: {
          profileURL: `https://${this.config.get(
            'S3_BUCKET'
          )}.${this.config.get('S3_ENDPOINT')}/${key}`,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true });

    if (!profile) {
      throw new NotFoundException();
    }

    return {
      url: `https://${this.config.get('S3_BUCKET')}.${this.config.get(
        'S3_ENDPOINT'
      )}/${key}`,
    };
  }
}
