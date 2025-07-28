import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, IsNull } from 'typeorm';
import { Company as CompanyORM } from './company.entity';
import { ICompanyRepository } from '../../domain/company.repository';
import { Company as CompanyDomain } from '../../domain/company.entity';
import { DateUtils } from '../../../common/utils/date.utils';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyORM)
    private readonly companyRepo: Repository<CompanyORM>,
  ) {}

  private toDomain(company: CompanyORM): CompanyDomain {
    return {
      id: company.id,
      name: company.name,
      adhesion_date: company.adhesion_date,
      deletedAt: company.deletedAt,
      transfers:
        company.transfers?.map((t) => ({
          id: t.id,
          company_id: t.company?.id ?? '',
          amount: Number(t.amount),
          transfer_date: t.transfer_date,
        })) ?? [],
    };
  }

  private toOrm(company: CompanyDomain): CompanyORM {
    const orm = new CompanyORM();
    orm.id = company.id;
    orm.name = company.name;
    orm.adhesion_date = company.adhesion_date;
    orm.deletedAt = company.deletedAt;
    // transfers se ignora en create/update
    return orm;
  }

  async create(company: CompanyDomain): Promise<CompanyDomain> {
    const orm = this.toOrm(company);
    const saved = await this.companyRepo.save(orm);
    return this.toDomain(saved);
  }

  async findLastMonth(): Promise<CompanyDomain[]> {
    const oneMonthAgo = DateUtils.getStartOfLastMonth();

    const companies = await this.companyRepo.find({
      where: {
        adhesion_date: MoreThanOrEqual(oneMonthAgo),
        deletedAt: IsNull(),
      },
      order: { adhesion_date: 'DESC' },
      relations: ['transfers'],
    });

    return companies.map((comp) => this.toDomain(comp));
  }

  async findWithTransfersLastMonth(): Promise<CompanyDomain[]> {
    const oneMonthAgo = DateUtils.getStartOfLastMonth();
    const companies = await this.companyRepo
      .createQueryBuilder('company')
      .innerJoinAndSelect('company.transfers', 'transfer')
      .where('transfer.transfer_date >= :lastMonth', { lastMonth: oneMonthAgo })
      .andWhere('company.deletedAt IS NULL')
      .getMany();
    return companies.map((comp) => this.toDomain(comp));
  }

  async findById(id: string): Promise<CompanyDomain | null> {
    const company = await this.companyRepo.findOne({
      where: { id, deletedAt: IsNull() },
    });
    return company ? this.toDomain(company) : null;
  }

  async findByName(name: string): Promise<CompanyDomain | null> {
    const company = await this.companyRepo.findOne({
      where: { name },
    });
    return company ? this.toDomain(company) : null;
  }

  async softDelete(id: string): Promise<void> {
    const company = await this.companyRepo.findOne({
      where: { id },
    });
    if (company) {
      await this.companyRepo.softRemove(company);
    }
  }
}
