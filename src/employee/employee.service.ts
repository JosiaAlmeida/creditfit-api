import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { IEmployeeService } from './interfaces/employee.service.interface';
import { IResponse } from 'src/util/generic-responsive';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}
  async findByUser(user: UserDTO): Promise<IResponse<CreateEmployeeDTO>> {
    const data = await this.employeeRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!data)
      return {
        HttpException: new HttpException(
          { message: 'Não foi possivel encontrar este funcionario' },
          HttpStatus.NO_CONTENT,
        ),
      };
    return {
      HttpException: new HttpException(
        { data, message: 'Funcionario encontrado' },
        HttpStatus.OK,
      ),
      data: data,
    };
  }

  async create(data: CreateEmployeeDTO): Promise<IResponse<CreateEmployeeDTO>> {
    try {
      const saveEmployee = this.employeeRepository.create(data);
      await this.employeeRepository.save(saveEmployee);
      return {
        HttpException: new HttpException(
          { message: 'Funcionario Criado com sucesso' },
          HttpStatus.CREATED,
        ),
        data: data,
      };
    } catch (error) {
      throw {
        HttpException: new HttpException(
          { message: `Erro interno: ${error}` },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      };
    }
  }
}
