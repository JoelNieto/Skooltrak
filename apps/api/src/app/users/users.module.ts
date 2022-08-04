import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';

import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async (config: ConfigService) => {
          const schema = UserSchema;
          const bucket = config.get<string>('S3_BUCKET');
          const endpoint = config.get<string>('S3_ENDPOINT');
          schema.pre<any>('save', function (next) {
            const user = this;
            if (this.isModified('password') || this.isNew) {
              genSalt(10, (saltError, salt) => {
                if (saltError) {
                  return next(saltError);
                } else {
                  hash(user.password, salt, (hashError, hash1) => {
                    if (hashError) {
                      return next(hashError);
                    }
                    user.password = hash1;
                    next();
                  });
                }
              });
            } else {
              user.avatar = `https://${bucket}.${endpoint}/profile_pic.jpeg`;
              return next();
            }
          });
          return schema;
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule],
})
export class UsersModule {}
