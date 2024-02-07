import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Odontologo extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop()
  matricula: string;

  @Prop()
  ciudad: string;

  @Prop()
  direccion: string;

  @Prop()
  tel: string;

  @Prop()
  mail: string;
}

export const OdontologoSchema = SchemaFactory.createForClass(Odontologo);
