import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILoanRequest } from './interfaces/loan_request.service.interface';
import { UserDTO } from 'src/user/dto/user.dto';
import { IResponse } from 'src/util/generic-responsive';
import { SimulatorDTO } from './dto/simulator.dto';
import { LoanRequest } from './loan_request.entity';
import { CreateLoanDTO } from './dto/create_loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employee/employee.service';
import { CreditScoreService } from './credit_score.service';
import { ValidationService } from './validate.service';

@Injectable()
export class LoanRequestService implements ILoanRequest {
  constructor(
    private readonly employeeService: EmployeeService,
    @InjectRepository(LoanRequest)
    private readonly loanRequestRepository: Repository<LoanRequest>,

    private readonly validationService: ValidationService,
    private readonly creditScoreService: CreditScoreService,
  ) {}

  async createLoan(
    loanRequest: CreateLoanDTO,
    employeeId: number,
  ): Promise<IResponse<CreateLoanDTO[]>> {
    const { amount, term } = loanRequest;
    // Find employee
    const findEmployee = await this.employeeService.findByUser({
      id: employeeId,
    } as UserDTO);

    if (!findEmployee.data) {
      throw new HttpException(
        { message: 'Obrigatório ser funcionário' },
        HttpStatus.FORBIDDEN,
      );
    }

    const salary = findEmployee.data.salary;
    // Validate term
    this.validationService.validateTerm(term);

    // Validate margin
    this.validationService.validateMargin(amount, term, salary);

    // Validate credit score
    const creditScore = await this.creditScoreService.getCreditScore();
    const validationScore = await this.validationService.validateCreditScore(
      salary,
      creditScore,
    );
    let status = 'Pendente';
    if (!validationScore) status = 'Aprovado';
    else status = 'Recusado';
    const installment = await this.requestTerm(loanRequest, salary);

    // Save installments to the database
    try {
      const saveItem = this.loanRequestRepository.create({
        amount: installment[0].amount,
        expireMonth: installment[installment.length - 1].expireMonth,
        startMonth: installment[0].expireMonth,
        term: term,
        status: status,
        employee: findEmployee.data,
      });

      await this.loanRequestRepository.save({
        ...saveItem,
        status: status,
        employee: findEmployee.data,
      });
      return {
        HttpException: new HttpException(
          { message: 'Solicitação criada com sucesso' },
          HttpStatus.CREATED,
        ),
        data: installment,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar empréstimo', error: error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLoanUser(user: number): Promise<IResponse<LoanRequest[]>> {
    const findEmployee = await this.employeeService.findByUser({
      id: user,
    } as UserDTO);

    if (!findEmployee.data)
      throw new HttpException(
        { message: 'Obrigatório ser funcionário' },
        HttpStatus.FORBIDDEN,
      );
    const getAll = await this.loanRequestRepository.findBy({
      employee: { id: findEmployee.data['id'] },
    });
    return {
      HttpException: new HttpException(
        { message: 'Lista de solicitação de emprestimo' },
        HttpStatus.OK,
      ),
      data: getAll,
    };
  }
  async simulator(
    loanRequest: CreateLoanDTO,
    salary: number,
  ): Promise<SimulatorDTO[]> {
    const { amount, status } = loanRequest;

    // Calculate installments
    const installment: CreateLoanDTO[] = [];
    const currentDate = new Date();

    for (let index = 1; index <= 4; index++) {
      const monthlyInstallment = amount / index;
      const paymentDate = new Date(currentDate);
      paymentDate.setMonth(currentDate.getMonth() + index - 1);
      installment.push({
        term: index,
        amount: monthlyInstallment,
        expireMonth: paymentDate,
        expireMonthDate: paymentDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        status: status || 'Pendente',
      });
    }
    return installment;
  }

  private async requestTerm(
    loanRequest: CreateLoanDTO,
    salary: number,
  ): Promise<CreateLoanDTO[]> {
    const { amount, term } = loanRequest;

    // Calculate installments
    const installment: CreateLoanDTO[] = [];
    const currentDate = new Date();

    for (let index = 1; index <= term; index++) {
      const monthlyInstallment = amount / term;
      const paymentDate = new Date(currentDate);
      paymentDate.setMonth(currentDate.getMonth() + index - 1);
      installment.push({
        term: index,
        amount: monthlyInstallment,
        expireMonth: paymentDate,
        expireMonthDate: paymentDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      });
    }
    return installment;
  }
}
