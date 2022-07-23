import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getEnvPath } from '../common/helper/env.helper';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { StudentsModule } from './students/students.module';
import { SchoolsModule } from './schools/schools.module';
import { DegreesModule } from './degrees/degrees.module';
import { StudyPlansModule } from './study-plans/study-plans.module';

const envFilePath = getEnvPath(`${process.cwd()}/apps/api/src/common/env`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
    StudentsModule,
    SchoolsModule,
    DegreesModule,
    StudyPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
