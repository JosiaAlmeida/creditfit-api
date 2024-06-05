import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDTO {
  @IsString({ message: 'Nome da empresa obrigatório' })
  @IsNotEmpty()
  company_name: string;
}
