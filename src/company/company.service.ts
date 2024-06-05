import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICompanyService } from './interfaces/company.service.interface';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { IResponse } from 'src/util/generic-responsive';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async get(): Promise<Company[]> {
    return await this.companyRepository.find();
  }
  async findById(id: number): Promise<IResponse<Company>> {
    const data = await this.companyRepository.findOne({ where: { id: id } });
    if (!data)
      return {
        HttpException: new HttpException(
          { message: 'Empresa não encontrada' },
          HttpStatus.NO_CONTENT,
        ),
      };
    return {
      HttpException: new HttpException(
        { message: 'Empresa encontrada' },
        HttpStatus.OK,
      ),
      data: data,
    };
  }
  async createCompany(company: CreateCompanyDTO): Promise<IResponse<Company>> {
    try {
      if (!company.company_name) {
        throw new HttpException(
          { message: 'Preencha os campos obrigatórios' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const companySave = this.companyRepository.create(company);
      await this.companyRepository.save(companySave);
      return {
        HttpException: new HttpException(
          { message: 'Empresa criada com successo', data: companySave },
          HttpStatus.CREATED,
        ),
        data: companySave,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Erro interno' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
