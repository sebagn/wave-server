import { Module } from '@nestjs/common';
import { OdontologosController } from './controllers/odontologos.controller';
import { OdontologosService } from './services/odontologos.service';

@Module({
  controllers: [OdontologosController],
  providers: [OdontologosService],
})
export class OdontologosModule {}
