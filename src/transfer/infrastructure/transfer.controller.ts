import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferService } from '../application/transfer.service';
import { Transfer } from '../domain/transfer.entity';

@ApiTags('transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new transfer',
    description: 'Creates a new transfer for a company',
  })
  @ApiResponse({
    status: 201,
    description: 'Transfer created successfully',
    type: Transfer,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found',
  })
  async create(@Body() dto: CreateTransferDto): Promise<Transfer> {
    return this.transferService.create(dto);
  }
}
