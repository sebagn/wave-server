import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EtapasService } from '../services/etapas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEtapaDTO } from 'src/dtos/etapa.dtos';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { StorageService } from 'src/storage/services/storage.service';
import { ImageValidationPipe } from 'src/common/file-validation/image.pipe';

@Controller('etapas')
export class EtapasController {
  constructor(
    private readonly etapasService: EtapasService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  get() {
    return this.etapasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.etapasService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateEtapaDTO) {
    return this.etapasService.create(payload);
  }

  @Put(':id/escaneos')
  @UseInterceptors(FileInterceptor('file'))
  async addFile(
    @Param('id', MongoIdPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.storageService.upload(file);
    const etapa = await this.etapasService.addFile(id, 'escaneos', result.url);
    return etapa;
  }

  @Put(':id/:type') // 'type' is either 'fotos', 'rx', 'ipr', 'attaches' or 'video'
  @UseInterceptors(FileInterceptor('file'))
  async addImage(
    @Param('id', MongoIdPipe) id: string,
    @Param('type') type: string,
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
  ) {
    const result = await this.storageService.upload(file);
    const etapa = await this.etapasService.addFile(id, type, result.url);
    return etapa;
  }
}
