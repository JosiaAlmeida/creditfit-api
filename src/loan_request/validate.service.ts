import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationService {
  validateTerm(term: number) {
    if (term > 4) {
      throw new HttpException(
        { message: 'Prestações excedidas' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  validateMargin(amount: number, term: number, salary: number) {
    const maxInstallmentAmount = salary * 0.35;
    if (amount / term > maxInstallmentAmount) {
      throw new HttpException(
        {
          message:
            'Valor da parcela excede a margem consignável de 35% do salário',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateCreditScore(salary: number, score: number) {
    let minScore: number;
    if (salary <= 2000) {
      minScore = 400;
    } else if (salary <= 4000) {
      minScore = 500;
    } else if (salary <= 8000) {
      minScore = 600;
    } else if (salary <= 12000) {
      minScore = 700;
    } else {
      minScore = 800;
    }
    return score < minScore;
  }
}
