import { Module } from '@nestjs/common';
import { PacientesController } from './controllers/pacientes.controller';
import { PacientesService } from './services/pacientes.service';
import { EtapasController } from './controllers/etapas.controller';
import { EtapasService } from './services/etapas.service';

@Module({
  controllers: [PacientesController, EtapasController],
  providers: [PacientesService, EtapasService],
})
export class PacientesModule {}
