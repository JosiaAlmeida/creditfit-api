import { Exclude } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsEmail,
} from 'class-validator';

export class SignupDTO {
  @IsString({ message: 'Formato do nome invalido' })
  @IsNotEmpty({ message: 'Preencha o nome completo' })
  full_name: string;

  @IsString({ message: 'Preencha o cpf' })
  @IsNotEmpty({ message: 'Preencha o nome completo' })
  cpf: string;

  cnpj?: string;

  @IsString({ message: 'Formato do e-mail invalido' })
  @IsEmail()
  @IsNotEmpty({ message: 'Preencha o e-mail' })
  email: string;

  @IsString({ message: 'Formato de senha invalida' })
  @IsNotEmpty({ message: 'Preencha a senha' })
  password: string;

  @IsString({ message: 'Permissão invalida' })
  @IsEnum(['employee', 'representative'], {
    message: "Apenas 'employee' e 'representative' são permitidos",
  })
  @IsNotEmpty({ message: 'Preencha a permissão' })
  role: string;

  // @IsString({ message: 'Formato do nome da empresa invalido' })
  companyName?: string;
  companyId?: number;
  salary?: number;
}
