import { UserDTO } from 'src/user/dto/user.dto';
import { IResponse } from 'src/util/generic-responsive';
import { LoanRequest } from '../loan_request.entity';
import { SimulatorDTO } from '../dto/simulator.dto';
import { CreateLoanDTO } from '../dto/create_loan.dto';

export interface ILoanRequest {
  getLoanUser(user: number): Promise<IResponse<LoanRequest[]>>;
  createLoan(
    loanRequest: CreateLoanDTO,
    employeeId: number,
  ): Promise<IResponse<CreateLoanDTO[]>>;
  simulator(
    loanRequest: CreateLoanDTO,
    employeeId: number,
  ): Promise<SimulatorDTO[]>;
}
