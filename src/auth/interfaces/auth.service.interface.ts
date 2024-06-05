import { HttpException } from '@nestjs/common';
import { SignupDTO } from '../dto/signup.dto';
import { LoginDTO } from '../dto/login.dto';
import { IResponse } from 'src/util/generic-responsive';
import { AuthDTO } from '../dto/auth.dto';
import { ProfileDTO } from '../dto/profile.dto';

export interface IAuthService {
  signup(data: SignupDTO): Promise<IResponse<AuthDTO>>;
  signin(data: LoginDTO): Promise<IResponse<AuthDTO>>;
  profile(cpf: string): Promise<ProfileDTO>;
}
