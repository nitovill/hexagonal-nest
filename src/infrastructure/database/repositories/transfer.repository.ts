import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer as TransferORM } from '../entities/transfer.entity';
import { Company as CompanyORM } from '../entities/company.entity';
import { ITransferRepository } from '../../../domain/transfer.repository';
import { Transfer as TransferDomain } from '../../../domain/transfer.entity';

@Injectable()
export class TransferRepository implements ITransferRepository {
  constructor(
    @InjectRepository(TransferORM)
    private readonly transferRepo: Repository<TransferORM>,
    @InjectRepository(CompanyORM)
    private readonly companyRepo: Repository<CompanyORM>,
  ) {}

  private toDomain(transfer: TransferORM): TransferDomain {
    return {
      id: transfer.id,
      company_id: transfer.company?.id ?? '',
      amount: Number(transfer.amount),
      transfer_date: transfer.transfer_date,
    };
  }

  private async toOrm(
    transfer: TransferDomain,
  ): Promise<TransferORM> {
    const orm = new TransferORM();
    orm.id = transfer.id;
    orm.amount = transfer.amount;
    orm.transfer_date = transfer.transfer_date;
    if (transfer.company_id) {
      const company = await this.companyRepo.findOne({
        where: { id: transfer.company_id },
      });
      if (!company) throw new Error('Company not found');
      orm.company = company;
    }
    return orm;
  }

  async create(
    transfer: TransferDomain,
  ): Promise<TransferDomain> {
    const orm = await this.toOrm(transfer);
    const saved = await this.transferRepo.save(orm);
    return this.toDomain(saved);
  }
}
