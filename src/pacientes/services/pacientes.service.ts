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

  async findAll() {
    return this.pacienteModel.find().exec();
  }
  async findOne(id: string) {
    const paciente = this.pacienteModel.findById(id).populate('etapas').exec();
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async addPaciente(paciente: CreatePacienteDTO) {
    const newPaciente = new this.pacienteModel(paciente);
    return newPaciente.save();
  }

  async updatePaciente(id: string, updatedPaciente: UpdatePacienteDTO) {
    const paciente = this.pacienteModel
      .findByIdAndUpdate(id, { $set: updatedPaciente }, { new: true })
      .exec();
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async addEtapaToPaciente(pacienteId: string, etapaId: string) {
    const paciente = await this.findOne(pacienteId);
    paciente.etapas.addToSet(etapaId);
    return paciente.save();
  }

  async removeEtapaFromPaciente(pacienteId: string, etapaId: string) {
    const paciente = await this.findOne(pacienteId);
    paciente.etapas.pull(etapaId);
    return paciente.save();
  }

  async deletePaciente(id: string) {
    return this.pacienteModel.findByIdAndDelete(id).exec();
  }
}
