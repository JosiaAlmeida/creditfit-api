import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDTO {
  @IsNumber()
  @IsNotEmpty({ message: 'Preencha a quantidade desejada' })
  amount: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Deve ser seleciona o total de prestações' })
  term: number;

  status?: string = 'Pendente';

  expireMonth?: Date;
  startMonth?: Date;
  expireMonthDate?: string;
}
