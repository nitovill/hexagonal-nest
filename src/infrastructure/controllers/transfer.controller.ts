import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferService } from '../../application/use-cases/transfer.service';
import { Transfer } from 'src/domain/transfer.entity';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() dto: CreateTransferDto): Promise<Transfer> {
    return this.transferService.create(dto);
  }
}
