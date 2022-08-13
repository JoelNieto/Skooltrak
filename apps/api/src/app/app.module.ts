import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getEnvPath } from '../common/helper/env.helper';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassGroupsModule } from './class-groups/class-groups.module';
import { CoursesModule } from './courses/courses.module';
import { DegreesModule } from './degrees/degrees.module';
import { FilesModule } from './files/files.module';
import { MessagesModule } from './messages/messages.module';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { StudyPlansModule } from './study-plans/study-plans.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { UsersModule } from './users/users.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AssignmentTypesModule } from './assignment-types/assignment-types.module';

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
    FilesModule,
    UsersModule,
    MessagesModule,
    StudentsModule,
    SchoolsModule,
    DegreesModule,
    StudyPlansModule,
    SubjectsModule,
    CoursesModule,
    TeachersModule,
    ClassGroupsModule,
    AssignmentsModule,
    AssignmentTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
