import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';

import { TeachersService } from '../teachers/teachers.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private model: Model<CourseDocument>,
    private teachers: TeachersService
  ) {}

  async create(dto: CreateCourseDto) {
    dto.degree = dto.degree ?? dto.plan.degree;
    dto.school = dto.school ?? dto.plan.school;
    dto.level = dto.level ?? dto.plan.level;

    const created = new this.model(dto);
    return created.save();
  }

  async findAll(user: User) {
    if (user.role === 'admin') {
      return this.model.find().populate('subject plan parentSubject teachers');
    }

    if (user.role === 'teacher') {
      const teacher = await this.teachers.findByUserId(user._id);
      return this.model.find({ teachers: new Types.ObjectId(teacher._id) });
    }
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
