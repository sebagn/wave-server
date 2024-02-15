import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
  IsArray,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreatePacienteDTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly codigo: number;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly apellido: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly dni: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly edad: number;

  @IsOptional()
  @IsString()
  readonly sexo: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  readonly etapas: string[];
}

export class UpdatePacienteDTO extends PartialType(
  OmitType(CreatePacienteDTO, ['codigo', 'etapas']),
) {}

export class AddEtapasToPacienteDTO {
  @IsNotEmpty()
  @IsArray()
  readonly etapasId: string[];
}
