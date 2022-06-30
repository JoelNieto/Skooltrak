import { Module } from '@nestjs/common';
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
        useFactory: () => {
          const schema = UserSchema;
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
              return next();
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
