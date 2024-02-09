import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateOdontologoDto {
  @IsNotEmpty()
  @IsString()
  readonly matricula: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly apellido: string;

  @IsNotEmpty()
  @IsString()
  readonly ciudad: string;

  @IsNotEmpty()
  @IsString()
  readonly dirección: string;

  @IsNotEmpty()
  @IsString()
  readonly tel: string;

  @IsNotEmpty()
  @IsString()
  readonly mail: string;

  @IsArray()
  readonly pacientes: string[];
}

export class UpdateOdontologoDto extends PartialType(
  OmitType(CreateOdontologoDto, ['pacientes']),
) {}

export class AddPacientesToOdontologoDto {
  @IsNotEmpty()
  @IsArray()
  readonly pacientesIds: string[];
}
