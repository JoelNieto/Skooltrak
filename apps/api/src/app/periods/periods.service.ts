import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApi } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { Period, PeriodDocument } from './schemas/period.schema';

@Injectable()
export class PeriodsService {
  constructor(@InjectModel(Period.name) private model: Model<PeriodDocument>) {}
  async create(createPeriodDto: CreatePeriodDto) {
    const created = new this.model(createPeriodDto);
    return created.save().then((x) => x.populate('school'));
  }

  findAll(query?: Partial<QueryApi>) {
    let _query = {};
    const { school } = query;
    _query = school
      ? { ..._query, school: new Types.ObjectId(school) }
      : _query;

    return this.model.find(query).populate('school');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('school');
  }

  update(id: string, updatePeriodDto: UpdatePeriodDto) {
    const { name, startDate, endDate, sort } = updatePeriodDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          startDate,
          endDate,
          sort,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('school');
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
