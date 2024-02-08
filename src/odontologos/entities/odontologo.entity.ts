import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Paciente } from 'src/pacientes/entities/paciente.entity';

@Schema()
export class Odontologo extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true })
  matricula: string;

  @Prop({ required: true })
  ciudad: string;

  @Prop()
  direccion: string;

  @Prop()
  tel: string;

  @Prop()
  mail: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Paciente.name }] })
  pacientes: Types.Array<Paciente>;
}

export const OdontologoSchema = SchemaFactory.createForClass(Odontologo);
