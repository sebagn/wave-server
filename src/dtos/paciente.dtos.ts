import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreatePacienteDTO {
  @IsNotEmpty()
  @IsString()
  readonly odontologo: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly apellido: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly edad: number;

  @IsNotEmpty()
  @IsString()
  readonly sexo: string;
}
