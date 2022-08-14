import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesController } from './files.controller';
import { UserFile, UserFileSchema } from './files.schema';
import { FilesService } from './files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserFile.name, schema: UserFileSchema },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
