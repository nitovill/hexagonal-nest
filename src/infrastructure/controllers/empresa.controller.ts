import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { EmpresaService } from '../../application/use-cases/empresa.service';
import { Empresa } from 'src/domain/empresa.entity';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  async create(@Body() dto: CreateEmpresaDto): Promise<Empresa> {
    return this.empresaService.create(dto);
  }

  @Get('last-month')
  async findLastMonth(): Promise<Empresa[]> {
    return this.empresaService.findLastMonth();
  }

  @Get('with-transferencias-last-month')
  async findWithTransferenciasLastMonth(): Promise<Empresa[]> {
    return this.empresaService.findWithTransferenciasLastMonth();
  }
}
