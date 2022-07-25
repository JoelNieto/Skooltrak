import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDegreeDto } from './dto/create-degree.dto';
import { UpdateDegreeDto } from './dto/update-degree.dto';
import { Degree, DegreeDocument } from './schemas/degree.schema';

@Injectable()
export class DegreesService {
  constructor(@InjectModel(Degree.name) private model: Model<DegreeDocument>) {}

  async create(createDegreeDto: CreateDegreeDto) {
    const created = new this.model(createDegreeDto);
    return created.save().then((x) => x.populate('school'));
  }

  findAll() {
    return this.model.find({}).populate('school');
  }

  findOne(id: string) {
    return this.model.findById(id).populate('school');
  }

  update(id: string, updateDegreeDto: UpdateDegreeDto) {
    const { name, level, active } = updateDegreeDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          level,
          active,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true });

    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return this.model.findById(id);
  }
}
