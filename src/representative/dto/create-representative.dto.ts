import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateRepresentativeDTO {
  @IsString({ message: 'Formato CNPJ invalido' })
  @IsNotEmpty({ message: 'Preencha o CNPJ' })
  cnpj: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Preencha o campo' })
  user: User;
}
