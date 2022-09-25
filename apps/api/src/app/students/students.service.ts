import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleEnum } from '@skooltrak-app/models';
import { Model } from 'mongoose';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './schemas/student.schema';

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
    return created.save().then((x) => x.populate('school plan degree group'));
  }

  findAll() {
    return this.model.find({}).populate('school plan degree group');
  }

  findOne(id: string) {
    return this.model.findById(id);
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
