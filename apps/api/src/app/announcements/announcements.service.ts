import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Model, Types } from 'mongoose';

import { User } from '../users/schemas/user.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Announcement, AnnouncementDocument } from './schemas/announcement.schema';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name) private model: Model<AnnouncementDocument>
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    user: models.User
  ) {
    const created = new this.model({ ...createAnnouncementDto, author: user });
    return created
      .save()
      .then((x) => x.populate('author plans school degrees groups courses'));
  }

  findAll(query: { course?: string }) {
    let _query = {};

    _query = query.course
      ? { ..._query, courses: new Types.ObjectId(query.course) }
      : _query;

    return this.model
      .find(_query)
      .populate('author plans school degrees groups courses');
  }

  findOne(id: string) {
    return this.model
      .findById(id)
      .populate('author plans school degrees groups courses');
  }

  update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    const {
      text,
      activeSince,
      activeUntil,
      school,
      courses,
      plans,
      degrees,
      groups,
    } = updateAnnouncementDto;
    const updated = this.model
      .findByIdAndUpdate(id, {
        $set: {
          text,
          activeSince,
          activeUntil,
          school,
          courses,
          plans,
          degrees,
          groups,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true })
      .populate('author plans school degrees groups courses');

    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
