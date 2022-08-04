import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Teacher, TeacherSchema } from './schemas/teacher.schema';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    UsersModule,
  ],
  controllers: [TeachersController],
  providers: [TeachersService, UsersService],
})
export class TeachersModule {}
