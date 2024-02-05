import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import { OdontologosModule } from './odontologos/odontologos.module';

@Module({
  imports: [PacientesModule, OdontologosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
