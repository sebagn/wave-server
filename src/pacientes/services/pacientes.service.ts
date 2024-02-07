import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePacienteDTO, UpdatePacienteDTO } from 'src/dtos/paciente.dtos';
import { Paciente } from '../entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectModel(Paciente.name) private pacienteModel: Model<Paciente>,
  ) {}

  public getPacientes() {
    return this.pacienteModel.find().exec();
  }
  public getPacienteById(id: string) {
    const paciente = this.pacienteModel.findById(id).exec();
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  public addPaciente(paciente: CreatePacienteDTO) {
    const newPaciente = new this.pacienteModel(paciente);
    return newPaciente.save();
  }

  public updatePaciente(id: string, updatedPaciente: UpdatePacienteDTO) {
    const paciente = this.pacienteModel
      .findByIdAndUpdate(id, { $set: updatedPaciente }, { new: true })
      .exec();
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  public deletePaciente(id: string) {
    return this.pacienteModel.findByIdAndDelete(id).exec();
  }
}
