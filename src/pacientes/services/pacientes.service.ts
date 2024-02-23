import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreatePacienteDTO, UpdatePacienteDTO } from 'src/dtos/paciente.dtos';
import { Paciente } from '../entities/paciente.entity';
import { Etapa } from '../entities/etapa.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectModel(Paciente.name) private pacienteModel: Model<Paciente>,
  ) {}

  async findAll() {
    return await this.pacienteModel
      .find()
      .populate({
        path: 'etapas',
        model: Etapa.name,
        select: 'numeroEtapa',
      })
      .exec();
  }

  async findOne(id: string) {
    const paciente = await this.pacienteModel
      .findById(id)
      .populate({
        path: 'etapas',
        model: Etapa.name,
        select: '_id numeroEtapa',
      })
      .exec();
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async addPaciente(paciente: CreatePacienteDTO) {
    const newPaciente = new this.pacienteModel(paciente);
    return await newPaciente.save();
  }

  async updatePaciente(id: string, updatedPaciente: UpdatePacienteDTO) {
    const paciente = await this.pacienteModel
      .findByIdAndUpdate(id, { $set: updatedPaciente }, { new: true })
      .exec();
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${id} not found`);
    }
    return paciente;
  }

  async addEtapaToPaciente(pacienteId: string, etapasId: string[]) {
    const paciente = await this.pacienteModel.findById(pacienteId);
    if (!paciente) {
      throw new NotFoundException(`Paciente with id ${pacienteId} not found`);
    }
    etapasId.forEach((id) => {
      const etapaid = new mongoose.Types.ObjectId(id);
      paciente.etapas.addToSet(etapaid);
    });
    return await paciente.save();
  }

  async removeEtapaFromPaciente(pacienteId: string, etapaId: string) {
    const paciente = await this.pacienteModel.findById(pacienteId);
    const etapaid = new mongoose.Types.ObjectId(etapaId);
    paciente.etapas.pull(etapaid);
    return paciente.save();
  }

  async deletePaciente(id: string) {
    await this.pacienteModel.findByIdAndDelete(id).exec();
    return {
      message: `Paciente with id ${id} has been deleted`,
    };
  }
}
