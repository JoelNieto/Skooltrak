import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateClassGroupDto } from './dto/create-class-group.dto';
import { UpdateClassGroupDto } from './dto/update-class-group.dto';
import { ClassGroup, ClassGroupDocument } from './schemas/class-group.schema';

@Injectable()
export class ClassGroupsService {
  constructor(
    @InjectModel(ClassGroup.name) private model: Model<ClassGroupDocument>
  ) {}

  async create(createClassGroupDto: CreateClassGroupDto) {
    const { plan } = createClassGroupDto;
    createClassGroupDto.degree = plan.degree;
    createClassGroupDto.school = plan.school;
    createClassGroupDto.level = plan.level;
    const created = new this.model(createClassGroupDto);
    return created.save().then((x) => x.populate('plan school degree'));
  }

  findAll() {
    return this.model.find({}).populate('plan school degree');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('plan school degree');
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
      .populate('plan school degree');

    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
