import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { RoleEnum } from '@skooltrak-app/models';
import { Model } from 'mongoose';

import { CreateMessageDto } from './dto/create-message.dto';
import { Inbox, InboxDocument } from './schemas/inbox.schema';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messages: Model<MessageDocument>,
    @InjectModel(Inbox.name) private inboxModel: Model<InboxDocument>
  ) {}
  create(createMessageDto: CreateMessageDto) {
    const created = new this.messages(createMessageDto);
    created.save();
    if (created) {
      const inbox = created.receivers.map((x) => ({
        receiver: x,
        message: created,
        sender: created.sender,
        subject: created.subject,
      }));
      this.inboxModel.insertMany(inbox);
      return created.populate('receivers sender');
    }
  }

  getAll() {
    return this.messages.find({});
  }

  findOne(id: string) {
    const found = this.messages.findById(id);
    if (!found) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }
  }

  async inbox(user: models.User, pagination: models.PaginationQuery) {
    const { pageIndex, pageSize } = pagination;

    const query = { user: user._id };

    const items = await this.inboxModel
      .find(query)
      .skip(pageIndex > 0 ? (pageIndex - 1) * pageSize : 0)
      .limit(pageSize)
      .sort({ arrivalAt: -1 })
      .populate('message sender');
    const count = await this.inboxModel.countDocuments(query);
    return { pageIndex: +pageIndex, pageSize: +pageSize, count, items };
  }

  sent(user: models.User, pagination: models.PaginationQuery) {
    const { pageIndex, pageSize } = pagination;
    const query = { sender: user._id };

    const items = this.inboxModel
      .find(query)
      .skip(pageIndex > 0 ? (pageIndex - 1) * pageSize : 0)
      .limit(pageSize)
      .sort({ arrivalAt: -1 })
      .populate('message sender');
    const count = this.inboxModel.countDocuments(query);
    return { pageIndex: +pageIndex, pageSize: +pageSize, count, items };
  }

  async getContacts(user: models.User) {
    const { role } = user;
    let contacts = [];
    if (role === RoleEnum.Admin) {
    }
  }

  remove(id: string) {
    return this.messages.findByIdAndDelete(id);
  }
}
