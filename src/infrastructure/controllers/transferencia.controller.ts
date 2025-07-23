import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransferenciaDto } from './dto/create-transferencia.dto';
import { TransferenciaService } from '../../application/use-cases/transferencia.service';
import { Transferencia } from '../../infrastructure/database/entities/transferencia.entity';

@Controller('transferencia')
export class TransferenciaController {
  constructor(private readonly transferenciaService: TransferenciaService) {}

  @Post()
  async create(@Body() dto: CreateTransferenciaDto): Promise<Transferencia> {
    return this.transferenciaService.create(dto);
  }
}
