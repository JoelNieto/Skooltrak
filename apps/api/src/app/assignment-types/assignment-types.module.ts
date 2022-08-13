import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssignmentTypesController } from './assignment-types.controller';
import { AssignmentTypesService } from './assignment-types.service';
import { AssignmentsTypeSchema, AssignmentType } from './schemas/assignment-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssignmentType.name, schema: AssignmentsTypeSchema },
    ]),
  ],
  controllers: [AssignmentTypesController],
  providers: [AssignmentTypesService],
})
export class AssignmentTypesModule {}
