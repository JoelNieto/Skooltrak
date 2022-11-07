import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradesModule } from '../grades/grades.module';
import { GradesService } from '../grades/grades.service';
import {
  StudentGrade,
  StudentGradeSchema,
} from './schemas/student-grade.schema';
import { StudentGradesController } from './student-grades.controller';
import { StudentGradesService } from './student-grades.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentGrade.name, schema: StudentGradeSchema },
    ]),
    GradesModule,
  ],
  controllers: [StudentGradesController],
  providers: [StudentGradesService, GradesService],
})
export class StudentGradesModule {}
