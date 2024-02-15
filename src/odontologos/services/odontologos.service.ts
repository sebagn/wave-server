import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import {
  CreateOdontologoDto,
  UpdateOdontologoDto,
} from 'src/dtos/odontologo.dtos';
import { Odontologo } from '../entities/odontologo.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Injectable()
export class OdontologosService {
  constructor(
    @InjectModel(Odontologo.name) private odontologoModel: Model<Odontologo>,
  ) {}

  async findAll() {
    return await this.odontologoModel
      .find()
      .populate({
        path: 'pacientes',
        model: Paciente.name,
        select: 'nombre apellido',
      })
      .exec();
  }

  async findOne(id: string) {
    const odontologo = await this.odontologoModel
      .findById(id)
      .populate({ path: 'pacientes', model: Paciente.name })
      .exec();
    if (!odontologo) {
      throw new NotFoundException('Odontologo no se ha encontrado');
    }
    return odontologo;
  }

  async create(odontologo: CreateOdontologoDto) {
    const newOdontologo = new this.odontologoModel(odontologo);
    return await newOdontologo.save();
  }

  async update(id: string, changes: UpdateOdontologoDto) {
    const odontologo = await this.odontologoModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!odontologo) {
      throw new NotFoundException('Odontologo no se ha encontrado');
    }
    return odontologo;
  }

  async remove(id: string) {
    return await this.odontologoModel.findByIdAndDelete(id).exec();
  }

  async addPaciente(id: string, pacienteId: string[]) {
    const odontologo = await this.odontologoModel.findById(id).exec();
    pacienteId.forEach((id) => {
      const pacienteid = new mongoose.Types.ObjectId(id);
      odontologo.pacientes.addToSet(pacienteid);
    });
    return await odontologo.save();
  }

  async removePaciente(id: string, pacienteId: string) {
    const odontologo = await this.odontologoModel.findById(id).exec();
    const pacienteid = new mongoose.Types.ObjectId(pacienteId);
    odontologo.pacientes.pull(pacienteid);
    return odontologo.save();
  }
}
