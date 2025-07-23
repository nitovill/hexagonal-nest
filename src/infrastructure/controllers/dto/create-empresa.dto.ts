import { IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsDateString()
  fecha_adhesion?: string;
}
