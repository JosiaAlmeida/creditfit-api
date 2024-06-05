import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Company } from 'src/company/company.entity';

export class UserDTO {
  id?: number;
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  cpf?: string;

  @IsString()
  cnpj?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true, toClassOnly: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNumber()
  @IsNotEmpty()
  company: Company;
}
