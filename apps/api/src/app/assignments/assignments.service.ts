import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryApiDate } from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';

import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment, AssignmentDocument } from './schemas/assignment.schema';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private model: Model<AssignmentDocument>
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const { plan } = createAssignmentDto.course;
    const created = new this.model({ ...createAssignmentDto, plan });
    return created
      .save()
      .then((x) => x.populate('teacher course plan group documents type'));
  }

  findAll(query: QueryApiDate) {
    let _query = {};
    let { start, end, course } = query;

    start = new Date(start);
    end = new Date(end);
    Logger.log(start, 'start');

    _query = { ..._query, start: { $gte: start, $lte: end } };

    _query = course
      ? { ..._query, course: new Types.ObjectId(course) }
      : _query;

    return this.model
      .find(_query)
      .sort({ start: 1 })
      .populate('teacher course plan group documents type')
      .populate({
        path: 'course',
        populate: {
          path: 'subject',
          model: 'Subject',
        },
      });
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
