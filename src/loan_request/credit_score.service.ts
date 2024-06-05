import { Injectable } from '@nestjs/common';
import axios from 'axios';

export class CreditScoreService {
  async getCreditScore(): Promise<number> {
    const { data } = await axios.get(
      'https://run.mocky.io/v3/ef99c032-8e04-4e6a-ad3e-6f413a9e707a',
    );
    return data.score;
  }
}
