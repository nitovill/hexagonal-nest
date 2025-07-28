import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
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
  async findLastMonth(@Res() res: Response): Promise<void> {
    const companies = await this.companyService.findLastMonth();
    if (companies.length === 0) {
      res.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    res.status(HttpStatus.OK).json(companies);
  }

  @Get('with-transfers-last-month')
  async findWithTransfersLastMonth(@Res() res: Response): Promise<void> {
    const companies = await this.companyService.findWithTransfersLastMonth();
    if (companies.length === 0) {
      res.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    res.status(HttpStatus.OK).json(companies);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.companyService.softDeleteCompany(id);
  }
}
