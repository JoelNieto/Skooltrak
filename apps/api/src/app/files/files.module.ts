import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesController } from './files.controller';
import { FileSchema, UserFile } from './files.schema';
import { FilesService } from './files.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserFile.name, schema: FileSchema }]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
