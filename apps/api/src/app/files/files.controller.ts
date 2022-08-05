import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import * as models from '@skooltrak-app/models';
import { Express } from 'express';
import { Multer } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../shared/decorators/user.decorator';
import { FilesService } from './files.service';

@ApiCookieAuth()
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private service: FilesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @User() user: models.User,
    @UploadedFile() file: Express.Multer.File
  ) {
    const { buffer, originalname, mimetype } = file;

    return await this.service.uploadFile(
      {
        dataBuffer: buffer,
        filename: originalname,
        type: mimetype,
      },
      user
    );
  }
}
