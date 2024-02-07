import { Module } from '@nestjs/common';
import { PacientesController } from './controllers/pacientes.controller';
import { PacientesService } from './services/pacientes.service';
import { EtapasController } from './controllers/etapas.controller';
import { EtapasService } from './services/etapas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Paciente, PacienteSchema } from './entities/paciente.entity';
import { Etapa, EtapaSchema } from './entities/etapa.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Paciente.name, schema: PacienteSchema },
      { name: Etapa.name, schema: EtapaSchema },
    ]),
  ],
  controllers: [PacientesController, EtapasController],
  providers: [PacientesService, EtapasService],
})
export class PacientesModule {}
