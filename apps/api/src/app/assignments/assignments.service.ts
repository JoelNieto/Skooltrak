import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { toDate } from 'date-fns';
import { Model } from 'mongoose';

import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment, AssignmentDocument } from './schemas/assignment.schema';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private model: Model<AssignmentDocument>
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const created = new this.model(createAssignmentDto);
    return created
      .save()
      .then((x) => x.populate('teacher course plan group documents'));
  }

  findAll(query: any) {
    const start = toDate(new Date(query.startDate));
    return Logger.log(start);
  }

  findOne(id: string) {
    return this.model
      .findById(id)
      .populate('teacher course plan group documents');
  }

  update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    const { title, description, start, end } = updateAssignmentDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          title,
          description,
          start,
          end,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('teacher course plan group documents');

    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
