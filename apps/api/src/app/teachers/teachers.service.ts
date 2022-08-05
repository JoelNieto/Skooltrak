import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private model: Model<TeacherDocument>,
    private users: UsersService
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { firstName, surname, documentId, email } = createTeacherDto;
    const user: CreateUserDto = {
      displayName: `${firstName} ${surname}`,
      password: documentId,
      username: email,
      email,
      role: 'teacher',
      blocked: false,
      profileURL: '',
    };

    const createdUser = await this.users.create(user);
    createTeacherDto.user = createdUser;
    const created = new this.model(createTeacherDto);
    return created.save().then((x) => x.populate('subjects user'));
  }

  findAll() {
    return this.model.find({}).populate('subjects');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('subjects');
  }

  findByUserId(id: string) {
    return this.model
      .findOne({ user: new Types.ObjectId(id) })
      .populate('subjects user');
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const {
      firstName,
      middleName,
      surname,
      secondSurname,
      gender,
      subjects,
      birthDate,
    } = updateTeacherDto;

    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          firstName,
          middleName,
          surname,
          secondSurname,
          gender,
          subjects,
          birthDate,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('subjects user');

    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return `This action removes a #${id} teacher`;
  }
}
