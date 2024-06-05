import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Company } from 'src/company/company.entity';
import { Representative } from 'src/representative/representative.entity';
import { RepresentativeService } from 'src/representative/representative.service';
import { EmployeeService } from 'src/employee/employee.service';
import { Employee } from 'src/employee/employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { Encrypt } from './auth.encryption';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, Representative, Employee]),
    JwtModule.register({
      global: true,
      secret: 'process.env.NEST_SECRET_TOKEN',
      signOptions: { expiresIn: '10800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    CompanyService,
    RepresentativeService,
    EmployeeService,
    Encrypt,
  ],
  exports: [
    AuthService,
    UserService,
    CompanyService,
    RepresentativeService,
    EmployeeService,
    Encrypt,
  ],
})
export class AuthModule {}
