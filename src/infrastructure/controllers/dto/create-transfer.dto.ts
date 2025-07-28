import { IsUUID, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateTransferDto {
  @IsUUID()
  company_id: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  transfer_date?: string;
}
