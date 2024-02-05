import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOdontologoDTO {
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
}

export class UpdateOdontologoDTO extends PartialType(CreateOdontologoDTO) {}
