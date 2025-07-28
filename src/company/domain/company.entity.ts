import { ApiProperty } from '@nestjs/swagger';
import { Transfer } from '../../transfer/domain/transfer.entity';

export class Company {
  @ApiProperty({
    description: 'Company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corporation',
  })
  name: string;

  @ApiProperty({
    description: 'Company adhesion date',
    example: '2024-01-15T00:00:00.000Z',
  })
  adhesion_date: Date;

  @ApiProperty({
    description: 'Soft delete timestamp',
    example: '2024-01-15T00:00:00.000Z',
    required: false,
  })
  deletedAt?: Date;

  @ApiProperty({
    description: 'Company transfers',
    type: [Transfer],
    required: false,
  })
  transfers?: Transfer[];
}
