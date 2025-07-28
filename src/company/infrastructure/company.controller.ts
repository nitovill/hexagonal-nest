import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from '../application/company.service';
import { Company } from '../domain/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(dto);
  }

  @Get('last-month')
  async findLastMonth(): Promise<Company[]> {
    return this.companyService.findLastMonth();
  }

  @Get('with-transfers-last-month')
  async findWithTransfersLastMonth(): Promise<Company[]> {
    return this.companyService.findWithTransfersLastMonth();
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.companyService.softDeleteCompany(id);
  }
}
