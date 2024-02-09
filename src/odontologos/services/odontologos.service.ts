import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateOdontologoDto,
  UpdateOdontologoDto,
} from 'src/dtos/odontologo.dtos';
import { Odontologo } from '../entities/odontologo.entity';

@Injectable()
export class OdontologosService {
  constructor(
    @InjectModel(Odontologo.name) private odontologoModel: Model<Odontologo>,
  ) {}

  async findAll() {
    return await this.odontologoModel.find().exec();
  }

  async findOne(id: string) {
    const odontologo = await this.odontologoModel.findById(id).exec();
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
    const odontologo = await this.findOne(id);
    pacienteId.forEach((id) => {
      odontologo.pacientes.addToSet(id);
    });
    return odontologo.save();
  }

  async removePaciente(id: string, pacienteId: string) {
    const odontologo = await this.odontologoModel.findById(id).exec();
    odontologo.pacientes.pull(pacienteId);
    return odontologo.save();
  }
}
