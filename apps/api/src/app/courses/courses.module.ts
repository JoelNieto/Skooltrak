import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClassGroupsModule } from '../class-groups/class-groups.module';
import { ClassGroupsService } from '../class-groups/class-groups.service';
import { DegreesModule } from '../degrees/degrees.module';
import { GradeTypesModule } from '../grade-types/grade-types.module';
import { GradeTypesService } from '../grade-types/grade-types.service';
import { SchoolsModule } from '../schools/schools.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { TeachersModule } from '../teachers/teachers.module';
import { TeachersService } from '../teachers/teachers.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    TeachersModule,
    GradeTypesModule,
    ClassGroupsModule,
    UsersModule,
    SubjectsModule,
    SchoolsModule,
    DegreesModule,
  ],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    TeachersService,
    ClassGroupsService,
    UsersService,
    GradeTypesService,
  ],
})
export class CoursesModule {}
