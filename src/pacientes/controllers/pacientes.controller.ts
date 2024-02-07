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

@Controller('pacientes')
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Get()
  getAllPacientes() {
    return this.pacientesService.getPacientes();
  }

  @Get(':id')
  getPacienteById(@Param('id') id: string) {
    return this.pacientesService.getPacienteById(id);
  }

  @Post()
  createPaciente(@Body() payload: CreatePacienteDTO) {
    const paciente = {
      id: 0,
      ...payload,
    };
    return this.pacientesService.addPaciente(paciente);
  }

  @Put(':id')
  updatePaciente(@Param('id') id: string, @Body() changes: UpdatePacienteDTO) {
    return this.pacientesService.updatePaciente(id, changes);
  }

  @Delete(':id')
  deletePaciente(@Param('id') id: string) {
    return this.pacientesService.deletePaciente(id);
  }
}
