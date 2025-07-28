import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ITransferRepository } from '../../domain/transfer.repository';
import { ICompanyRepository } from '../../domain/company.repository';
import { Transfer } from '../../domain/transfer.entity';
import { CreateTransferDto } from '../../infrastructure/controllers/dto/create-transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @Inject('ITransferRepository')
    private readonly transferRepository: ITransferRepository,
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(dto: CreateTransferDto): Promise<Transfer> {
    const company = await this.companyRepository.findById(dto.company_id);
    if (!company) {
      throw new NotFoundException(
        `Company with ID: '${dto.company_id}' not found`,
      );
    }
    const transfer = new Transfer();
    transfer.company_id = dto.company_id;
    transfer.amount = dto.amount;
    transfer.transfer_date = dto.transfer_date
      ? new Date(dto.transfer_date)
      : new Date();
    return this.transferRepository.create(transfer);
  }
}
