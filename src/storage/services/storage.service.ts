import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import config from 'src/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private client = new S3Client({
    region: config().storage.awsRegion,
    credentials: {
      accessKeyId: config().storage.awsAccessKeyId,
      secretAccessKey: config().storage.awsSecretAccessKey,
    },
  });

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigService<typeof config>,
  ) {}

  async upload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    file.originalname = file.originalname.replace(/ /g, '_');

    const command = new PutObjectCommand({
      Bucket: config().storage.awsBucketName,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'bucket-owner-full-control',
    });
    const url = `https://${config().storage.awsBucketName}.s3.amazonaws.com/${file.originalname}`;
    await this.client.send(command);

    return { url, key: file.originalname };
  }

  // async delete(key: string) {
  //   // Delete the file from the S3 bucket
  //   // await this.s3.deleteObject({
  //   //   Bucket: process.env.BUCKET_NAME,
  //   //   Key: key,
  //   // }).promise();
  // }

  // async getSignedUrl(key: string) {
  //   // Get the signed URL of the file
  //   // return this.s3.getSignedUrl('getObject', {
  //   //   Bucket: process.env.BUCKET_NAME,
  //   //   Key: key,
  //   //   Expires: 60,
  //   // });
  // }

  // async getFiles() {
  //   // Get the list of files from the S3 bucket
  //   // return this.s3.listObjectsV2({ Bucket: process.env.BUCKET_NAME }).promise();
  // }

  // async getFile(key: string) {
  //   // Get the file from the S3 bucket
  //   // return this.s3.getObject({ Bucket: process.env.BUCKET_NAME, Key: key }).promise();
  // }

  // async moveFile(sourceKey: string, destinationKey: string) {
  // Move the file to another location in the S3 bucket
  // await this.copyFile(sourceKey, destinationKey);
  // await this.delete(sourceKey);
  // }
}
