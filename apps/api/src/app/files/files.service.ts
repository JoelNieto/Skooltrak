import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as models from '@skooltrak-app/models';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { UserFile } from './files.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(UserFile.name) private model: Model<UserFile>,
    private config: ConfigService
  ) {}

  async uploadFile(
    file: { dataBuffer: Buffer; filename: string; type: string },
    user: models.User
  ) {
    const { dataBuffer, filename, type } = file;
    const s3Client = new S3({
      endpoint: `https://${this.config.get('S3_ENDPOINT')}`,
      region: this.config.get('S3_REGION'),
      credentials: {
        accessKeyId: this.config.get('S3_KEY'),
        secretAccessKey: this.config.get('S3_SECRET'),
      },
    });

    const key = `user_files/${uuid()}-${filename.replace(/ /g, '_')}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.get('S3_BUCKET'),
        Body: dataBuffer,
        Key: key,
        ContentType: type,
        ACL: 'public-read',
      })
    );

    const created = new this.model({
      owner: user,
      name: filename,
      type: type,
      url: `https://${this.config.get('S3_BUCKET')}.${this.config.get(
        'S3_ENDPOINT'
      )}/${key}`,
    });

    return await (await created.save()).populate('owner', '-__v -password');
  }

  async changeAvatar(
    image: {
      dataBuffer: Buffer;
      filename: string;
      type: string;
    },
    folder: string
  ) {
    const s3Client = new S3({
      endpoint: `https://${this.config.get('S3_ENDPOINT')}`,
      region: this.config.get('S3_REGION'),
      credentials: {
        accessKeyId: this.config.get('S3_KEY'),
        secretAccessKey: this.config.get('S3_SECRET'),
      },
    });

    const key = `${folder}/${uuid()}-${image.filename}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.get('S3_BUCKET'),
        Body: image.dataBuffer,
        Key: key,
        ContentType: image.type,
        ACL: 'public-read',
      })
    );

    const pictureURL = `https://${this.config.get(
      'S3_BUCKET'
    )}.${this.config.get('S3_ENDPOINT')}/${key}`;
    return {
      url: pictureURL,
    };
  }
}
