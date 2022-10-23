import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApi } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade, GradeDocument } from './schemas/grade.schema';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private model: Model<GradeDocument>) {}

  async create(createGradeDto: CreateGradeDto) {
    const created = new this.model(createGradeDto);
    return created.save().then((x) => x.populate('group course teacher type'));
  }

  findAll(query: QueryApi) {
    const { course, period, group } = query;
    let _query = {};
    _query = course
      ? { ..._query, course: new Types.ObjectId(course) }
      : _query;
    _query = period ? { ...query, period: new Types.ObjectId(period) } : _query;
    _query = group ? { ...query, group: new Types.ObjectId(group) } : _query;
    return this.model.find(_query).populate('group course teacher type');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('group course teacher type');
  }

  update(id: string, updateGradeDto: UpdateGradeDto) {
    const { title, date, type, published, group } = updateGradeDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          title,
          date,
          type,
          published,
          group,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('group course teacher type');
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
