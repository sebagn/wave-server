import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Etapa } from '../entities/etapa.entity';
import { CreateEtapaDTO, UpdateEtapaDTO } from '../../dtos/etapa.dtos';

@Injectable()
export class EtapasService {
  constructor(@InjectModel(Etapa.name) private etapaModel: Model<Etapa>) {}

  public getEtapas() {
    return this.etapaModel.find().exec();
  }

  public getEtapaById(id: string) {
    const etapa = this.etapaModel.findById(id).exec();
    if (!etapa) {
      throw new NotFoundException(`Etapa with id ${id} not found`);
    }
    return etapa;
  }

  public addEtapa(etapa: CreateEtapaDTO) {
    const newEtapa = new this.etapaModel(etapa);
    return newEtapa.save();
  }

  public updateEtapa(id: string, updatedEtapa: UpdateEtapaDTO) {
    const etapa = this.etapaModel
      .findByIdAndUpdate(id, { $set: updatedEtapa }, { new: true })
      .exec();
    if (!etapa) {
      throw new NotFoundException(`Etapa with id ${id} not found`);
    }
    return etapa;
  }

  public deleteEtapa(id: string) {
    return this.etapaModel.findByIdAndDelete(id).exec();
  }
}
