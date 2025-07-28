import { Company } from './company.entity';

export interface ICompanyRepository {
  create(company: Company): Promise<Company>;
  findLastMonth(): Promise<Company[]>;
  findWithTransfersLastMonth(): Promise<Company[]>;
  findById(id: string): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
  softDelete(id: string): Promise<void>;
}
