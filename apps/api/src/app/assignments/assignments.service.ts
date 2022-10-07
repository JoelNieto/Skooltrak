import { Injectable, NotFoundException } from '@nestjs/common';
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

    const teacher = createAssignmentDto.createdBy.person.teacher;
    const created = new this.model({ ...createAssignmentDto, plan, teacher });
    return created
      .save()
      .then((x) =>
        x.populate('teacher course plan group documents type createdBy')
      );
  }

  findAll(query: QueryApiDate) {
    let _query = {};
    let { start, end, course, teacher, group } = query;

    start = new Date(start);
    end = new Date(end);

    _query = { ..._query, start: { $gte: start, $lte: end } };

    _query = course
      ? { ..._query, course: new Types.ObjectId(course) }
      : _query;
    _query = teacher
      ? { ..._query, teacher: new Types.ObjectId(teacher) }
      : _query;
    _query = group ? { ..._query, group: new Types.ObjectId(group) } : _query;

    return this.model
      .find(_query)
      .sort({ start: 1 })
      .populate('teacher course plan group documents type createdBy')
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
      .populate('teacher course plan group documents createdBy type')
      .populate({
        path: 'course',
        populate: {
          path: 'subject',
          model: 'Subject',
        },
      });
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
