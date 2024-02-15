import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Etapa } from './etapa.entity';

@Schema()
export class Paciente extends Document {
  @Prop({ required: true, unique: true })
  codigo: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  dni: number;

  @Prop()
  edad: number;

  @Prop()
  sexo: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Etapa.name }] })
  etapas: Types.Array<Etapa>;
}
export const PacienteSchema = SchemaFactory.createForClass(Paciente);
