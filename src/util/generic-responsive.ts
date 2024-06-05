import { HttpException } from '@nestjs/common';

export interface IResponse<T> {
  data?: T;
  HttpException: HttpException;
}
