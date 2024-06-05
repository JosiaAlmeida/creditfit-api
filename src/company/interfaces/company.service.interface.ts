import { CreateCompanyDTO } from '../dto/create-company.dto';
import { Company } from '../company.entity';
import { IResponse } from 'src/util/generic-responsive';

export interface ICompanyService {
  get(): Promise<Company[]>;
  findById(id: number): Promise<IResponse<Company>>;
  createCompany(company: CreateCompanyDTO): Promise<IResponse<Company>>;
}
