import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get()
  async get() {
    return await this.companyService.get();
  }
  @Post()
  async create(@Body() company: CreateCompanyDTO) {
    const data = await this.companyService.createCompany(company);
    return data;
  }
}
