import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';
import { StudyPlan, StudyPlanDocument } from './schemas/study-plan.schemas';

@Injectable()
export class StudyPlansService {
  constructor(
    @InjectModel(StudyPlan.name) private model: Model<StudyPlanDocument>
  ) {}

  async create(createStudyPlanDto: CreateStudyPlanDto) {
    const created = new this.model(createStudyPlanDto);
    return created.save().then((x) => x.populate('school degree'));
  }

  findAll() {
    return this.model.find({}).populate('school degree');
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateStudyPlanDto: UpdateStudyPlanDto) {
    const { name, degree, level, year, school, active } = updateStudyPlanDto;

    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          degree,
          level,
          year,
          school,
          active,
          updatedAt: new Date(),
        },
      })
      .populate('school degree')
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
