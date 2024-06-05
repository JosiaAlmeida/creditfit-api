import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { RepresentativeService } from 'src/representative/representative.service';
import { IResponse } from 'src/util/generic-responsive';
import { AuthDTO } from './dto/auth.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Encrypt } from './auth.encryption';
import { ProfileDTO } from './dto/profile.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userSercice: UserService,
    private readonly companyService: CompanyService,
    private readonly representativeService: RepresentativeService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly encryptService: Encrypt,
  ) {}

  async profile(cpf: string): Promise<ProfileDTO> {
    const findUser = await this.userSercice.findByCPF(cpf);
    if (!findUser.data) throw new UnauthorizedException();

    const findCompany = await this.companyService.findById(
      findUser.data.company.id,
    );
    if (findUser.data.role === 'employee') {
      const findEmployee = await this.employeeService.findByUser(findUser.data);
      if (!findEmployee.data) throw findEmployee.HttpException;
      return {
        ...findUser.data,
        salary: findEmployee.data.salary,
        company_name: findCompany.data.company_name,
      } as ProfileDTO;
    }
    const findRepresentative = await this.representativeService.findByUser(
      findUser.data,
    );
    if (!findRepresentative.data) throw findRepresentative.HttpException;
    return {
      full_name: findUser.data.full_name,
      email: findUser.data.email,
      role: findUser.data.role,
      cpf: findUser.data.cpf,
      cnpj: findRepresentative.data.cnpj,
      company_name: findCompany.data.company_name,
    } as ProfileDTO;
  }

  async signup(data: SignupDTO): Promise<IResponse<AuthDTO>> {
    if (
      (
        await this.userSercice.findByEmail(data.email)
      ).HttpException.getStatus() === HttpStatus.OK
    )
      throw new HttpException(
        { message: 'E-mail já existente' },
        HttpStatus.BAD_REQUEST,
      );

    if (
      (await this.userSercice.findByCPF(data.cpf)).HttpException.getStatus() ===
      HttpStatus.OK
    )
      throw new HttpException(
        { message: 'CPF em uso' },
        HttpStatus.BAD_REQUEST,
      );
    data.password = await this.encryptService.encrypt(data.password);
    if (data.role === 'representative') {
      if (!data.cnpj)
        throw new HttpException(
          { message: 'CNPJ Invalido' },
          HttpStatus.BAD_REQUEST,
        );
      const result = await this.signupRepresentative(data);
      if (!result.data) throw result.HttpException;
      return {
        HttpException: result.HttpException,
        data: await this.CreateToken(result.data as UserDTO),
      };
    }

    if (!data.companyId)
      throw new HttpException(
        { message: 'Preencha a empresa' },
        HttpStatus.BAD_REQUEST,
      );
    if (!data.salary)
      throw new HttpException(
        { message: 'Preencha o salario' },
        HttpStatus.BAD_REQUEST,
      );

    const result = await this.signupEmployee(data);
    if (!result.data) throw result.HttpException;
    return {
      HttpException: result.HttpException,
      data: await this.CreateToken(result.data as UserDTO),
    };
  }

  async signin(data: LoginDTO): Promise<IResponse<AuthDTO>> {
    const findUser = await this.userSercice.findByEmail(data.email);
    if (!findUser.data)
      throw new HttpException(
        { message: 'Email/Senha incorreta' },
        HttpStatus.UNAUTHORIZED,
      );
    const verifyPassword = await this.encryptService.compare(
      data.password,
      findUser.data.password,
    );
    if (!verifyPassword)
      throw new HttpException(
        { message: 'Email/Senha incorreta' },
        HttpStatus.UNAUTHORIZED,
      );
    return {
      HttpException: new HttpException(
        { message: 'Login foi um sucesso' },
        HttpStatus.OK,
      ),
      data: await this.CreateToken(findUser.data),
    };
  }

  private async CreateToken(data: UserDTO): Promise<AuthDTO> {
    const payload = {
      sub: data.cpf,
      username: data.full_name,
      id: data.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: data,
    };
  }

  private async signupRepresentative(
    data: SignupDTO,
  ): Promise<IResponse<UserDTO>> {
    const verifyCNPJ = await this.representativeService.findByCNPJ(data.cnpj);
    if (verifyCNPJ.HttpException.getStatus() === HttpStatus.OK)
      throw new HttpException(
        { message: 'CNPJ invalido/existente' },
        HttpStatus.BAD_REQUEST,
      );
    const companySave = await this.companyService.createCompany({
      company_name: data.companyName.toString(),
    });

    if (!companySave.data)
      return {
        HttpException: companySave.HttpException,
      };

    const userRepresentative = await this.userSercice.create({
      company: companySave.data,
      cpf: data.cpf,
      full_name: data.full_name,
      password: data.password,
      role: data.role,
      email: data.email,
    });

    if (!userRepresentative.data)
      return {
        HttpException: userRepresentative.HttpException,
      };

    const representative = await this.representativeService.create({
      cnpj: data.cnpj,
      user: userRepresentative.data as User,
    });

    return {
      HttpException: representative.HttpException,
      data: {
        ...userRepresentative.data,
      },
    };
  }

  private async signupEmployee(data: SignupDTO): Promise<IResponse<UserDTO>> {
    const verifyCompany = await this.companyService.findById(data.companyId);
    if (!verifyCompany.data)
      return { HttpException: verifyCompany.HttpException };

    const user = await this.userSercice.create({
      company: verifyCompany.data,
      cpf: data.cpf,
      full_name: data.full_name,
      password: data.password,
      role: data.role,
      email: data.email,
    });

    if (!user.data)
      return {
        HttpException: user.HttpException,
      };

    const employee = await this.employeeService.create({
      salary: data.salary,
      user: user.data as User,
    });

    return {
      HttpException: employee.HttpException,
      data: {
        ...user.data,
      },
    };
  }
}
