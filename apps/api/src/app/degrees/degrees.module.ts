import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DegreesController } from './degrees.controller';
import { DegreesService } from './degrees.service';
import { Degree, DegreeSchema } from './schemas/degree.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Degree.name, schema: DegreeSchema }]),
  ],
  controllers: [DegreesController],
  providers: [DegreesService],
})
export class DegreesModule {}
