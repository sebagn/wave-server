import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Odontologo } from 'src/odontologos/entities/odontologo.entity';

@Schema()
export class Paciente extends Document {
  @Prop({ required: true })
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
}
export const PacienteSchema = SchemaFactory.createForClass(Paciente);
