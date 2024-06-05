import { Module } from '@nestjs/common';
import { LoanRequestService } from './loan_request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequest } from './loan_request.entity';
import { LoanRequestController } from './loan_request.controller';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/employee.entity';
import { CreditScoreService } from './credit_score.service';
import { ValidationService } from './validate.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRequest, Employee])],
  providers: [
    LoanRequestService,
    EmployeeService,
    CreditScoreService,
    ValidationService,
  ],
  exports: [
    LoanRequestService,
    EmployeeService,
    CreditScoreService,
    ValidationService,
  ],
  controllers: [LoanRequestController],
})
export class LoanRequestModule {}
