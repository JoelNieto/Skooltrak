import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GradeTypesController } from './grade-types.controller';
import { GradeTypesService } from './grade-types.service';
import { GradeType, GradeTypeSchema } from './schemas/grade-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradeType.name, schema: GradeTypeSchema },
    ]),
  ],
  controllers: [GradeTypesController],
  providers: [GradeTypesService],
  exports: [MongooseModule],
})
export class GradeTypesModule {}
