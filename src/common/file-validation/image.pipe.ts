import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('File type is not an image');
    }
    return file;
  }
}
