import {
  IsUUID,
  IsNumber,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
  @ApiProperty({
    description: 'Company ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  company_id: string;

  @ApiProperty({
    description: 'Transfer amount',
    example: 1000.5,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @ApiProperty({
    description: 'Transfer date',
    example: '2024-01-15T10:30:00Z',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsDateString()
  transfer_date?: string;
}
