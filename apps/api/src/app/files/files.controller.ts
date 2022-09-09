import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiQuery({ name: 'folder', type: String })
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: models.QueryApi
  ) {
    const { buffer, originalname, mimetype } = file;

    return await this.service.changeAvatar(
      { dataBuffer: buffer, filename: originalname, type: mimetype },
      query.folder
    );
  }
}
