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

import { Paciente } from '../entities/paciente.entity';
import { CreatePacienteDTO, UpdatePacienteDTO } from '../../dtos/paciente.dtos';

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get()
  getAllPacientes() {
    return this.pacientesService.getPacientes();
  }

  @Get(':id')
  getPacienteById(@Param('id') id: number) {
    return this.pacientesService.getPacienteById(id);
  }

  @Post()
  createPaciente(@Body() payload: CreatePacienteDTO) {
    const paciente: Paciente = {
      id: 0,
      ...payload,
    };
    return this.pacientesService.addPaciente(paciente);
  }

  @Put(':id')
  updatePaciente(
    @Param('id') id: number,
    @Body() updatedPaciente: UpdatePacienteDTO,
  ) {
    return this.pacientesService.updatePaciente(id, updatedPaciente);
  }

  @Delete(':id')
  deletePaciente(@Param('id') id: number) {
    return this.pacientesService.deletePaciente(id);
  }
}
