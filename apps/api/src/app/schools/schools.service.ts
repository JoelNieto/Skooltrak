import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School, SchoolDocument } from './schemas/school.schema';

@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School.name) private model: Model<SchoolDocument>) {}

  create(createSchoolDto: CreateSchoolDto) {
    const created = new this.model(createSchoolDto);
    return created.save();
  }

  findAll() {
    return this.model.find({});
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateSchoolDto: UpdateSchoolDto) {
    const { name, shortName, currentYear, motto, logoURL, website, address } =
      updateSchoolDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          shortName,
          logoURL,
          motto,
          address,
          currentYear,
          website,
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
    return this.model.findByIdAndDelete(id);
  }
}
