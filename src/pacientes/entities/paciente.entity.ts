import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Paciente extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop()
  edad: number;

  @Prop()
  sexo: string;

  @Prop({ required: true })
  odontologo: string;
}
export const PacienteSchema = SchemaFactory.createForClass(Paciente);
