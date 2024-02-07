import { Module } from '@nestjs/common';
import { OdontologosController } from './controllers/odontologos.controller';
import { OdontologosService } from './services/odontologos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Odontologo, OdontologoSchema } from './entities/odontologo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Odontologo.name, schema: OdontologoSchema },
    ]),
  ],
  controllers: [OdontologosController],
  providers: [OdontologosService],
})
export class OdontologosModule {}
