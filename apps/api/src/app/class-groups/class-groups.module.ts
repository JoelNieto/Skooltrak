import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClassGroupsController } from './class-groups.controller';
import { ClassGroupsService } from './class-groups.service';
import { ClassGroup, ClassGroupSchema } from './schemas/class-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassGroup.name, schema: ClassGroupSchema },
    ]),
  ],
  controllers: [ClassGroupsController],
  providers: [ClassGroupsService],
})
export class ClassGroupsModule {}
