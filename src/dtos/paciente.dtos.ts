import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

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

  @IsNotEmpty()
  @IsString()
  readonly odontologo: string;
}

export class UpdatePacienteDTO extends PartialType(CreatePacienteDTO) {}
