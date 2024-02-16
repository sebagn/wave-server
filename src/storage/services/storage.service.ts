import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import config from 'src/config';

@Injectable()
export class StorageService {
  private client = new S3Client({
    region: config().storage.awsRegion,
    credentials: {
      accessKeyId: config().storage.awsAccessKeyId,
      secretAccessKey: config().storage.awsSecretAccessKey,
    },
  });

  constructor() {}

  async upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    file.originalname =
      crypto.randomUUID() + file.originalname.replace(/ /g, '_');

    const command = new PutObjectCommand({
      Bucket: config().storage.awsBucketName,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'bucket-owner-full-control',
    });
    await this.client.send(command);

    return { key: file.originalname };
  }

  async getObject(arr: string[]) {
    const files = arr.map(async (key) => {
      const command = new GetObjectCommand({
        Bucket: config().storage.awsBucketName,
        Key: key,
      });
      const preSignedUrL = await getSignedUrl(this.client, command, {
        expiresIn: 3600,
      });
      return preSignedUrL;
    });

    return files;
  }
}
