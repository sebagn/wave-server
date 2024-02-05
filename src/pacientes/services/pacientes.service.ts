import { Injectable, NotFoundException } from '@nestjs/common';

import { Paciente } from '../entities/paciente.entity';
import { CreatePacienteDTO, UpdatePacienteDTO } from 'src/dtos/paciente.dtos';

@Injectable()
export class PacientesService {
  private counterId = 1;
  private pacientes: Paciente[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      edad: 30,
      sexo: 'Masculino',
      odontologo: 'Carlos',
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Lopez',
      edad: 25,
      sexo: 'Masculino',
      odontologo: 'Juan',
    },
    {
      id: 3,
      nombre: 'Ana',
      apellido: 'Gomez',
      edad: 35,
      sexo: 'Femenino',
      odontologo: 'Carlos',
    },
  ];

  public getPacientes() {
    return this.pacientes;
  }
  public getPacienteById(id: number) {
    console.log(id);
    const paciente = this.pacientes.find((paciente) => paciente.id === id);
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  public addPaciente(paciente: CreatePacienteDTO) {
    this.counterId = this.counterId + 1;
    const newPaciente = {
      id: this.counterId,
      ...paciente,
    };
    this.pacientes.push(newPaciente);

    return paciente;
  }

  public updatePaciente(id: number, updatedPaciente: UpdatePacienteDTO) {
    const pacienteIndex = this.pacientes.findIndex(
      (paciente) => paciente.id === id,
    );
    if (pacienteIndex !== -1) {
      this.pacientes[pacienteIndex] = {
        ...this.pacientes[pacienteIndex],
        ...updatedPaciente,
      };
      return updatedPaciente;
    }
    return null;
  }

  public deletePaciente(id: number) {
    const pacienteIndex = this.pacientes.findIndex(
      (paciente) => paciente.id === id,
    );
    if (pacienteIndex !== -1) {
      const deletedPaciente = this.pacientes.splice(pacienteIndex, 1)[0];
      return deletedPaciente;
    }
    return null;
  }
}
