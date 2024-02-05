import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateEtapaDTO {
  // datos de ingreso
  @IsNotEmpty()
  @IsString()
  readonly pacienteId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly numeroEtapa: number;

  @IsNotEmpty()
  @IsString()
  readonly diagnostico: string;

  @IsNotEmpty()
  @IsString()
  readonly planTratamiento: string;

  @IsNotEmpty()
  @IsUrl()
  readonly fotos: string[];

  @IsNotEmpty()
  @IsUrl()
  readonly rx: string[];

  @IsNotEmpty()
  @IsUrl()
  readonly escaneos: string[];

  // datos de informe 02
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly alineadoresSup: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly alineadoresInf: number;

  @IsNotEmpty()
  @IsUrl()
  readonly ipr: string[];

  @IsNotEmpty()
  @IsUrl()
  readonly attach: string[];
}

export class UpdateEtapaDTO extends PartialType(
  OmitType(CreateEtapaDTO, ['pacienteId']),
) {}
