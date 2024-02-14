import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Etapa } from '../entities/etapa.entity';
import { CreateEtapaDTO, UpdateEtapaDTO } from '../../dtos/etapa.dtos';

@Injectable()
export class EtapasService {
  constructor(@InjectModel(Etapa.name) private etapaModel: Model<Etapa>) {}

  async findAll() {
    return this.etapaModel.find().exec();
  }

  async findOne(id: string) {
    const etapa = this.etapaModel.findById(id).exec();
    if (!etapa) {
      throw new NotFoundException(`Etapa with id ${id} not found`);
    }
    return etapa;
  }

  async create(etapa: CreateEtapaDTO) {
    const newEtapa = new this.etapaModel(etapa);
    return newEtapa.save();
  }

  async update(id: string, updatedEtapa: UpdateEtapaDTO) {
    const etapa = this.etapaModel
      .findByIdAndUpdate(id, { $set: updatedEtapa }, { new: true })
      .exec();
    if (!etapa) {
      throw new NotFoundException(`Etapa with id ${id} not found`);
    }
    return etapa;
  }

  async addFile(id: string, type: string, url: string) {
    const etapa = await this.findOne(id);
    await etapa[type].addToSet(url);
    return etapa.save();
  }

  async delete(id: string) {
    return this.etapaModel.findByIdAndDelete(id).exec();
  }
}
