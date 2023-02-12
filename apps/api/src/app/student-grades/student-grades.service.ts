import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApi, RoleEnum, User } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';
import { GradesService } from '../grades/grades.service';
import { CreateStudentGradeDto } from './dto/create-student-grade.dto';
import {
  StudentGrade,
  StudentGradeDocument,
} from './schemas/student-grade.schema';
import * as CONST from './student-grades.const';
@Injectable()
export class StudentGradesService {
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

    const { course, period } = await this.grades.findOne(grade);

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
        .populate(CONST.POPULATE);
    }

    const created = new this.model({
      student,
      course,
      grade,
      score,
      period,
      noGrade,
    });
    return created.save().then((x) => x.populate(CONST.POPULATE));
  }

  findAll(query: QueryApi, user: User) {
    const { grade, student, course, group, period } = query;
    const { role, person } = user;

    let _query = {};
    !!grade && (_query = { ..._query, grade });

    !!course && (_query = { ..._query, course });
    !!group && (_query = { ..._query, group });
    !!period && (_query = { ..._query, period });

    if (role === RoleEnum.Student) {
      _query = { ..._query, student: new Types.ObjectId(person.student._id) };
    } else {
      !!student && (_query = { ..._query, student });
    }
    return this.model.find(_query).populate(CONST.POPULATE);
  }

  findAllGroup(query: QueryApi) {
    const { group, period } = query;
  }

  findOne(id: string) {
    return this.model.findById(id).populate(CONST.POPULATE);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
