import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateEmployeeDTO {
  @IsNumber({ allowNaN: false })
  @IsNotEmpty({ message: 'Preencha o Salario' })
  salary: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Preencha o campo de utilizador' })
  user: User;
}
