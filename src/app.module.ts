import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { RepresentativeModule } from './representative/representative.module';
import { EmployeeModule } from './employee/employee.module';
import { LoanRequestModule } from './loan_request/loan_request.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.NEST_HOST,
      port: Number(process.env.NEST_PORT),
      username: 'sa',
      password: process.env.NEST_PASSWORD,
      database: process.env.NEST_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      options: {
        trustServerCertificate: true,
        encrypt: true,
        enableArithAbort: true,
      },
      // migrations: ['src/database/migration/*.ts'],
    }),
    CompanyModule,
    UserModule,
    RepresentativeModule,
    EmployeeModule,
    LoanRequestModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
