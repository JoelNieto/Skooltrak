import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TeachersModule } from '../teachers/teachers.module';
import { TeachersService } from '../teachers/teachers.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ClassGroupsController } from './class-groups.controller';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroup, ClassGroupSchema } from './schemas/class-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassGroup.name, schema: ClassGroupSchema },
    ]),
    TeachersModule,
    UsersModule,
  ],
  exports: [MongooseModule],
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService, TeachersService, UsersService],
})
export class ClassGroupsModule {}
