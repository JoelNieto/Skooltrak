import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApi, RoleEnum } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './schemas/student.schema';
import { STUDENT_POPULATE } from './students.const';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private model: Model<StudentDocument>,
    private users: UsersService
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { firstName, surname, documentId, email } = createStudentDto;

    const user: CreateUserDto = {
      displayName: `${firstName} ${surname}`,
      password: documentId,
      username: documentId,
      email,
      role: RoleEnum.Student,
      blocked: false,
      profileURL: '',
    };

    const userCreated = await this.users.create(user);
    createStudentDto.user = userCreated;
    const created = new this.model(createStudentDto);
    return created.save().then((x) => x.populate(STUDENT_POPULATE));
  }

  findAll(query: QueryApi) {
    let _query = {};
    let { group } = query;

    _query = group ? { ..._query, group: new Types.ObjectId(group) } : _query;
    return this.model.find(_query).populate(STUDENT_POPULATE);
  }

  findOne(id: string) {
    return this.model.findById(id).populate(STUDENT_POPULATE);
  }

  findByUserId(id: string) {
    return this.model
      .findOne({ user: new Types.ObjectId(id) })
      .populate(STUDENT_POPULATE);
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    const {
      firstName,
      middleName,
      surname,
      secondSurname,
      school,
      plan,
      degree,
      level,
      group,
      birthDate,
      address,
      guardians,
      gender,
      medicalInfo,
      father,
      mother,
      profilePicURL,
    } = updateStudentDto;

    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          firstName,
          middleName,
          surname,
          secondSurname,
          school,
          plan,
          degree,
          level,
          group,
          birthDate,
          address,
          guardians,
          gender,
          mother,
          medicalInfo,
          father,
          profilePicURL,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('school plan degree group');
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}
