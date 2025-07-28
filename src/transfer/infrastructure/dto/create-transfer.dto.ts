import {
  IsUUID,
  IsNumber,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateTransferDto {
  @IsUUID()
  company_id: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @IsOptional()
  @IsDateString()
  transfer_date?: string;
}
