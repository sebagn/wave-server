import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Etapa extends Document {
  @Prop({ required: true })
  numeroEtapa: number;
  @Prop()
  diagnostico: string;
  @Prop()
  planTratamiento: string;
  @Prop()
  fotos: string[];
  @Prop()
  rx: string[];
  @Prop()
  escaneos: string[];
  @Prop()
  alineadoresSup: number;
  @Prop()
  alineadoresInf: number;
  @Prop()
  ipr: string[];
  @Prop()
  attaches: string[];
  @Prop()
  video: string;
}

export const EtapaSchema = SchemaFactory.createForClass(Etapa);
