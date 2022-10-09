import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject, SubjectDocument } from './schemas/subject.schemas';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private model: Model<SubjectDocument>
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const created = new this.model(createSubjectDto);
    return created.save().then((x) => x.populate('parent'));
  }

  findAll() {
    return this.model.find({}).sort('name').populate('parent');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('parent');
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const { name, shortName, code, parent } = updateSubjectDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          shortName,
          code,
          parent,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('parent');

    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
