import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EtapasService } from '../services/etapas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEtapaDTO, UpdateEtapaDTO } from 'src/dtos/etapa.dtos';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { StorageService } from 'src/storage/services/storage.service';
// import { ImageValidationPipe } from 'src/common/file-validation/image.pipe';

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

  @Get(':id') // REFACTOR THIS
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const etapa = await this.etapasService.findOne(id);
    etapa.escaneos = await Promise.all(
      await this.storageService.getObject(etapa.escaneos),
    );
    etapa.fotos = await Promise.all(
      await this.storageService.getObject(etapa.fotos),
    );
    etapa.rx = await Promise.all(await this.storageService.getObject(etapa.rx));
    etapa.ipr = await Promise.all(
      await this.storageService.getObject(etapa.ipr),
    );
    etapa.attaches = await Promise.all(
      await this.storageService.getObject(etapa.attaches),
    );
    return etapa;
  }

  @Post()
  create(@Body() payload: CreateEtapaDTO) {
    return this.etapasService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateEtapaDTO,
  ) {
    return this.etapasService.update(id, payload);
  }

  @Put(':id/escaneos')
  @UseInterceptors(FileInterceptor('file'))
  async addFile(
    @Param('id', MongoIdPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.storageService.upload(file);
    const etapa = await this.etapasService.addFile(id, 'escaneos', result.key);
    return etapa;
  }

  @Put(':id/:type') // 'type' is either 'fotos', 'rx', 'ipr', 'attaches' or 'video'
  @UseInterceptors(FileInterceptor('file'))
  async addImage(
    @Param('id', MongoIdPipe) id: string,
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.storageService.upload(file);
    const etapa = await this.etapasService.addFile(id, type, result.key);
    return etapa;
  }

  @Delete(':ids')
  async deleteMany(@Param('ids', MongoIdPipe) id: string) {
    return this.etapasService.delete(id);
  }
}
