import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoanRequestService } from './loan_request.service';
import { CreateLoanDTO } from './dto/create_loan.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SimulatorDTO } from './dto/simulator.dto';

@Controller('loan-request')
export class LoanRequestController {
  constructor(private readonly loanRequestService: LoanRequestService) {}

  @Post('simulator')
  Simulator(@Body() simulatorDTO: SimulatorDTO) {
    return this.loanRequestService.simulator(simulatorDTO, simulatorDTO.salary);
  }

  @UseGuards(AuthGuard)
  @Post('request')
  CreateLoanRequest(@Request() req, @Body() loan: CreateLoanDTO) {
    return this.loanRequestService.createLoan(loan, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('my-loan-request')
  getAll(@Request() req) {
    return this.loanRequestService.getLoanUser(req.user.id);
  }
}
