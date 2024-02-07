import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateOdontologoDto } from 'src/dtos/odontologo.dtos';
import { Odontologo } from '../entities/odontologo.entity';

@Injectable()
export class OdontologosService {
  constructor(
    @InjectModel(Odontologo.name) private odontologoModel: Model<Odontologo>,
  ) {}

  public findAll() {
    return this.odontologoModel.find().exec();
  }

  public findOne(id: string) {
    const odontologo = this.odontologoModel.findById(id).exec();
    if (!odontologo) {
      throw new NotFoundException('Odontologo not found');
    }
    return odontologo;
  }

  public create(odontologo: any) {
    const newOdontologo = new this.odontologoModel(odontologo);
    return newOdontologo.save();
  }

  public update(id: string, changes: UpdateOdontologoDto) {
    const odontologo = this.odontologoModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!odontologo) {
      throw new NotFoundException('Odontologo not found');
    }
    return odontologo;
  }

  public remove(id: string) {
    return this.odontologoModel.findByIdAndDelete(id).exec();
  }
}
