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
  readonly planTratamiento: string;
}

export class UpdateEtapaDTO extends PartialType(CreateEtapaDTO) {
  // datos de informe 02
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly alineadoresSup: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly alineadoresInf: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly observaciones: string;
}

export class AddFileDTO {
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
