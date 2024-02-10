import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EtapasService } from '../services/etapas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEtapaDTO } from 'src/dtos/etapa.dtos';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { StorageService } from 'src/storage/services/storage.service';

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

  @Post(':id/:type') // 'type': 'fotos', 'rx', 'escaneos', 'ipr', 'attaches', 'video'
  @UseInterceptors(FileInterceptor('file'))
  async add(
    @Param('id', MongoIdPipe) id: string,
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(id, type, file);
    if (file) {
      console.log('fli');
      await this.storageService.isImageFile(file);
      const result = await this.storageService.upload(file);
      const etapa = await this.etapasService.addFile(id, type, result.url);
      return etapa;
    }
  }
}
