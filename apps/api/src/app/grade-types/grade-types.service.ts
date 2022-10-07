import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGradeTypeDto } from './dto/create-grade-type.dto';
import { UpdateGradeTypeDto } from './dto/update-grade-type.dto';
import { GradeType, GradeTypeDocument } from './schemas/grade-type.schema';

@Injectable()
export class GradeTypesService {
  constructor(
    @InjectModel(GradeType.name) private model: Model<GradeTypeDocument>
  ) {}

  create(createGradeTypeDto: CreateGradeTypeDto) {
    const created = new this.model(createGradeTypeDto);
    return created.save();
  }

  findAll() {
    return this.model.find({}).populate('courses');
  }

  findOne(id: string) {
    return `This action returns a #${id} gradeType`;
  }

  update(id: string, updateGradeTypeDto: UpdateGradeTypeDto) {
    const { name, type, weighting } = updateGradeTypeDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          type,
          weighting,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true });
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
