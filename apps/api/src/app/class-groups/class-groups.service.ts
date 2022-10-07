import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApi, User } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';

import { TeachersService } from '../teachers/teachers.service';
import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { ClassGroup, ClassGroupDocument } from './schemas/class-group.schema';

@Injectable()
export class ClassGroupsService {
  constructor(
    @InjectModel(ClassGroup.name) private model: Model<ClassGroupDocument>,
    private teachers: TeachersService
  ) {}

  async create(createClassGroupDto: CreateClassGroupDto) {
    const { plan } = createClassGroupDto;
    const { degree, school, level } = plan;

    const created = new this.model({
      ...createClassGroupDto,
      degree,
      school,
      level,
    });
    return created
      .save()
      .then((x) => x.populate('plan school degree counselor'));
  }

  findByPlan(id: string) {
    return this.model
      .find({ plan: id })
      .populate('plan school degree counselor');
  }

  async findAll(user: User, query?: QueryApi) {
    const { role, _id } = user;

    if (role === 'admin') {
      return this.model.find(query).populate('plan school degree counselor');
    }

    if (role === 'teacher') {
      const teacher = await this.teachers.findByUserId(_id);
      const _query = query.plan
        ? query
        : { ...query, counselor: new Types.ObjectId(teacher._id) };
      return this.model.find(_query).populate('plan school degree counselor');
    }
  }

  findOne(id: string) {
    return this.model.findById(id).populate('plan school degree counselor');
  }

  update(id: string, updateClassGroupDto: UpdateClassGroupDto) {
    const { name, plan, counselor } = updateClassGroupDto;
    const { degree, level, school } = plan;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          plan,
          counselor,
          degree,
          level,
          school,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('plan school degree counselor');

    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
