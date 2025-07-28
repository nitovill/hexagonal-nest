import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ICompanyRepository } from '../../domain/company.repository';
import { Company } from '../../domain/company.entity';
import { CreateCompanyDto } from '../../infrastructure/controllers/dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('Company name cannot be empty');
    }

    const existingCompany = await this.companyRepository.findByName(dto.name);
    if (existingCompany) {
      throw new ConflictException(
        `There is already a company with the name: '${dto.name}'`,
      );
    }

    const company = new Company();
    company.name = dto.name.trim();
    company.adhesion_date = dto.adhesion_date
      ? new Date(dto.adhesion_date)
      : new Date();
    return this.companyRepository.create(company);
  }

  async findLastMonth(): Promise<Company[]> {
    return this.companyRepository.findLastMonth();
  }

  async findWithTransfersLastMonth(): Promise<Company[]> {
    return this.companyRepository.findWithTransfersLastMonth();
  }

  async softDeleteCompany(id: string): Promise<void> {
    await this.companyRepository.softDelete(id);
  }
}
