import { IsUUID, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateTransferenciaDto {
  @IsUUID()
  empresa_id: string;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsDateString()
  fecha_transferencia?: string;
}
