import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OdontologosService } from '../services/odontologos.service';
import {
  CreateOdontologoDto,
  UpdateOdontologoDto,
} from '../../dtos/odontologo.dtos';

@Controller('odontologos')
export class OdontologosController {
  constructor(private readonly odontologosService: OdontologosService) {}

  @Get()
  getOdontologos() {
    return this.odontologosService.findAll();
  }

  @Get(':id')
  getOdontologo(@Param('id') id: string) {
    return this.odontologosService.findOne(+id);
  }

  @Post()
  createOdontologo(@Body() payload: CreateOdontologoDto) {
    return this.odontologosService.create(payload);
  }

  @Put(':id')
  updateOdontologo(
    @Param('id') id: string,
    @Body() payload: UpdateOdontologoDto,
  ) {
    return this.odontologosService.update(+id, payload);
  }

  @Delete(':id')
  removeOdontologo(@Param('id') id: string) {
    return this.odontologosService.remove(+id);
  }
}
