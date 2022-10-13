import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodsController } from './periods.controller';
import { PeriodsService } from './periods.service';
import { Period, PeriodSchema } from './schemas/period.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: PeriodSchema, name: Period.name }]),
  ],
  controllers: [PeriodsController],
  providers: [PeriodsService],
})
export class PeriodsModule {}
