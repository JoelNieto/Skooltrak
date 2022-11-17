import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApi } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';
import { GradesService } from '../grades/grades.service';
import { CreateStudentGradeDto } from './dto/create-student-grade.dto';
import {
  StudentGrade,
  StudentGradeDocument,
} from './schemas/student-grade.schema';

@Injectable()
export class StudentGradesService {
  private populate = 'student grade course';
  constructor(
    @InjectModel(StudentGrade.name) private model: Model<StudentGradeDocument>,
    private grades: GradesService
  ) {}
  async create(createStudentGradeDto: CreateStudentGradeDto, query: QueryApi) {
    const { score, noGrade } = createStudentGradeDto;
    const { student, grade } = query;
    const current = await this.model.findOne({
      student: new Types.ObjectId(student),
      grade: new Types.ObjectId(grade),
    });

    const { course, period } = await this.model.findById(grade);

    if (current) {
      return this.model
        .findByIdAndUpdate(current.id, {
          $set: {
            updatedAt: new Date(),
            score,
            noGrade,
          },
        })
        .setOptions({ new: true })
        .populate(this.populate);
    }

    const created = new this.model({
      student,
      course,
      grade,
      score,
      period,
      noGrade,
    });
    return created.save().then((x) => x.populate(this.populate));
  }

  findAll(query: QueryApi) {
    const { grade, student } = query;
    let _query = {};
    !!grade && (_query = { ..._query, grade });
    !!student && (_query = { ..._query, student });
    return this.model.find(_query).populate(this.populate);
  }

  findOne(id: string) {
    return this.model.findById(id).populate(this.populate);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
