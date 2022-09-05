import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';

import { ClassGroup, ClassGroupDocument } from '../class-groups/schemas/class-group.schema';
import { TeachersService } from '../teachers/teachers.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private model: Model<CourseDocument>,
    @InjectModel(ClassGroup.name) private groups: Model<ClassGroupDocument>,
    private teachers: TeachersService
  ) {}

  async create(dto: CreateCourseDto) {
    const { degree, school, level } = dto.plan;
    const created = new this.model({
      ...dto,
      degree,
      school,
      level,
    });
    return created
      .save()
      .then((x) => x.populate('subject plan parentSubject teachers school'));
  }

  async findAll(user: User) {
    const { role, _id } = user;
    if (role === 'admin') {
      return this.model
        .find()
        .populate('subject plan parentSubject teachers school');
    }

    if (role === 'teacher') {
      const teacher = await this.teachers.findByUserId(_id);
      return this.model
        .find({ teachers: new Types.ObjectId(teacher._id) })
        .populate('subject plan parentSubject teachers school');
    }
  }

  async getGroups(id: string) {
    const course = await this.findOne(id);
    return this.groups.find({ plan: course.plan._id });
  }

  findOne(id: string) {
    return this.model
      .findById(id)
      .populate('subject plan parentSubject teachers');
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    const { plan, subject, parentSubject, teachers } = updateCourseDto;
    const { school, degree, level } = plan;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          plan,
          subject,
          parentSubject,
          school,
          degree,
          teachers,
          level,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true });

    if (!updated) {
      throw new NotFoundException();
    }
    return updated.populate('subject plan parentSubject teachers');
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
