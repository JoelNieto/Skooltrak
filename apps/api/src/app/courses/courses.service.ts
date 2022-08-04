import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private model: Model<CourseDocument>) {}

  async create(dto: CreateCourseDto) {
    dto.degree = dto.degree ?? dto.plan.degree;
    dto.school = dto.school ?? dto.plan.school;
    dto.level = dto.level ?? dto.plan.level;

    const created = new this.model(dto);
    return created.save();
  }

  findAll() {
    return this.model.find().populate('subject plan parentSubject');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('subject plan parentSubject');
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    const { plan, subject, parentSubject } = updateCourseDto;
    const { school, degree, level } = plan;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          plan,
          subject,
          parentSubject,
          school,
          degree,
          level,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true });

    if (!updated) {
      throw new NotFoundException();
    }
    return updated.populate('subject plan parentSubject');
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
