import { ApiProperty } from '@nestjs/swagger';

export class Transfer {
  @ApiProperty({
    description: 'Transfer ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  company_id: string;

  @ApiProperty({
    description: 'Transfer amount',
    example: 1000.5,
  })
  amount: number;

  @ApiProperty({
    description: 'Transfer date',
    example: '2024-01-15T10:30:00.000Z',
  })
  transfer_date: Date;
}
