import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    UsersModule,
  ],
  exports: [MongooseModule],
  controllers: [StudentsController],
  providers: [StudentsService, UsersService],
})
export class StudentsModule {}
