import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateEtapaDTO {
  // datos de ingreso
  @IsNotEmpty()
  @IsNumber()
  readonly codPaciente: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly numeroEtapa: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly diagnostico: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly tratamiento: string;
}

export class UpdateEtapaDTO extends PartialType(
  OmitType(CreateEtapaDTO, ['codPaciente'] as const),
) {
  // datos de informe 02
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly alineadoresSup: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly alineadoresInf: number;
}

export class AddFileDTO {
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
