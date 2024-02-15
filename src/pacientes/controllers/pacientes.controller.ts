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
import {
  CreatePacienteDTO,
  UpdatePacienteDTO,
  AddEtapasToPacienteDTO,
} from '../../dtos/paciente.dtos';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get()
  getAllPacientes() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  getPacienteById(@Param('id', MongoIdPipe) id: string) {
    return this.pacientesService.findOne(id);
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

  @Put(':pacienteId/etapas')
  addEtapaToPaciente(
    @Param('pacienteId', MongoIdPipe) pacienteId: string,
    @Body() payload: AddEtapasToPacienteDTO,
  ) {
    return this.pacientesService.addEtapaToPaciente(
      pacienteId,
      payload.etapasId,
    );
  }

  @Put(':pacienteId/etapas/:etapaId')
  removeEtapaFromPaciente(
    @Param('pacienteId', MongoIdPipe) pacienteId: string,
    @Param('etapaId', MongoIdPipe) etapaId: string,
  ) {
    return this.pacientesService.removeEtapaFromPaciente(pacienteId, etapaId);
  }

  @Delete(':id')
  deletePaciente(@Param('id', MongoIdPipe) id: string) {
    return this.pacientesService.deletePaciente(id);
  }
}
