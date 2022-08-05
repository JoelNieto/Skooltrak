import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    const created = new this.model(createUserDto);
    return created.save();
  }

  findAll() {
    return this.model.find({}, { password: 0 });
  }

  findOne(id: string) {
    return this.model.findById(id, { password: 0 });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { username, email, profileURL, blocked, access, displayName } =
      updateUserDto;
    const changed = this.model
      .findByIdAndUpdate(id, {
        $set: {
          username,
          displayName,
          email,
          profileURL,
          blocked,
          access,
          updatedAt: new Date(),
        },
      })
      .setOptions({ new: true });
    if (!changed) {
      throw new NotFoundException();
    }
    return changed;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
