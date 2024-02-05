import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOdontologoDto } from 'src/dtos/odontologo.dtos';

@Injectable()
export class OdontologosService {
  private odontologos = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      matricula: '1234',
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Lopez',
      matricula: '5678',
    },
  ];

  public findAll() {
    return this.odontologos;
  }

  public findOne(id: number) {
    return this.odontologos.find((odontologo) => odontologo.id === id);
  }

  public create(odontologo: any) {
    this.odontologos.push(odontologo);
    return odontologo;
  }

  public update(id: number, changes: UpdateOdontologoDto) {
    const index = this.odontologos.findIndex((o) => o.id === id);
    if (!index) {
      throw new NotFoundException('Odontologo not found');
    }
    this.odontologos[index] = { ...this.odontologos[index], ...changes };
    return this.odontologos[index];
  }

  public remove(id: number) {
    const index = this.odontologos.findIndex((o) => o.id === id);
    this.odontologos.splice(index, 1);
    return { id };
  }
}
