import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAssignmentTypeDto } from './dto/create-assignment-type.dto';
import { UpdateAssignmentTypeDto } from './dto/update-assignment-type.dto';
import {
  AssignmentType,
  AssignmentTypeDocument,
} from './schemas/assignment-type.schema';

@Injectable()
export class AssignmentTypesService {
  constructor(
    @InjectModel(AssignmentType.name)
    private model: Model<AssignmentTypeDocument>
  ) {}

  create(createAssignmentTypeDto: CreateAssignmentTypeDto) {
    const created = new this.model(createAssignmentTypeDto);
    return created.save();
  }

  findAll() {
    return this.model.find({});
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateAssignmentTypeDto: UpdateAssignmentTypeDto) {
    const { name, summative, color } = updateAssignmentTypeDto;
    Logger.log(updateAssignmentTypeDto, 'type');
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          name,
          summative,
          color,
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
