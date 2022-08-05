import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudyPlan, StudyPlanSchema } from './schemas/study-plan.schemas';
import { StudyPlansController } from './study-plans.controller';
import { StudyPlansService } from './study-plans.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudyPlan.name, schema: StudyPlanSchema },
    ]),
  ],
  controllers: [StudyPlansController],
  providers: [StudyPlansService],
})
export class StudyPlansModule {}
