import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PacientesService } from '../services/pacientes.service';
import { CreatePacienteDTO, UpdatePacienteDTO } from '../../dtos/paciente.dtos';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get()
  getAllPacientes() {
    return this.pacientesService.getPacientes();
  }

  @Get(':id')
  getPacienteById(@Param('id', MongoIdPipe) id: string) {
    return this.pacientesService.getPacienteById(id);
  }

  @Post()
  createPaciente(@Body() payload: CreatePacienteDTO) {
    return this.pacientesService.addPaciente(payload);
  }

  @Put(':id')
  updatePaciente(
    @Param('id', MongoIdPipe) id: string,
    @Body() changes: UpdatePacienteDTO,
  ) {
    return this.pacientesService.updatePaciente(id, changes);
  }

  @Delete(':id')
  deletePaciente(@Param('id', MongoIdPipe) id: string) {
    return this.pacientesService.deletePaciente(id);
  }
}
