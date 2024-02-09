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
  AddPacientesToOdontologoDto,
  CreateOdontologoDto,
  UpdateOdontologoDto,
} from '../../dtos/odontologo.dtos';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('odontologos')
export class OdontologosController {
  constructor(private readonly odontologosService: OdontologosService) {}

  @Get()
  get() {
    return this.odontologosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.odontologosService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOdontologoDto) {
    return this.odontologosService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOdontologoDto,
  ) {
    return this.odontologosService.update(id, payload);
  }

  @Put(':id/pacientes')
  updatePaciente(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddPacientesToOdontologoDto,
  ) {
    return this.odontologosService.addPaciente(id, payload.pacientesIds);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.odontologosService.remove(id);
  }

  @Delete(':id/pacientes/:pacienteId')
  removePaciente(
    @Param('id', MongoIdPipe) id: string,
    @Param('pacienteId', MongoIdPipe) pacienteId: string,
  ) {
    return this.odontologosService.removePaciente(id, pacienteId);
  }
}
