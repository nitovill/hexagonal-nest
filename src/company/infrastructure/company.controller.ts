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
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from '../application/company.service';
import { Company } from '../domain/company.entity';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new company',
    description: 'Creates a new company with the provided information',
  })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
    type: Company,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(dto);
  }

  @Get('last-month')
  @ApiOperation({
    summary: 'Get companies from last month',
    description: 'Retrieves all companies that were created in the last month',
  })
  @ApiResponse({
    status: 200,
    description: 'Companies retrieved successfully',
    type: [Company],
  })
  @ApiResponse({
    status: 204,
    description: 'No companies found for the last month',
  })
  async findLastMonth(@Res() res: Response): Promise<void> {
    const companies = await this.companyService.findLastMonth();
    if (companies.length === 0) {
      res.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    res.status(HttpStatus.OK).json(companies);
  }

  @Get('with-transfers-last-month')
  @ApiOperation({
    summary: 'Get companies with transfers from last month',
    description: 'Retrieves companies that have transfers in the last month',
  })
  @ApiResponse({
    status: 200,
    description: 'Companies with transfers retrieved successfully',
    type: [Company],
  })
  @ApiResponse({
    status: 204,
    description: 'No companies with transfers found for the last month',
  })
  async findWithTransfersLastMonth(@Res() res: Response): Promise<void> {
    const companies = await this.companyService.findWithTransfersLastMonth();
    if (companies.length === 0) {
      res.status(HttpStatus.NO_CONTENT).send();
      return;
    }
    res.status(HttpStatus.OK).json(companies);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Soft delete a company',
    description: 'Performs a soft delete of a company by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Company ID to delete',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Company deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Company not found',
  })
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.companyService.softDeleteCompany(id);
  }
}
