import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.service.interface';
import { UserDTO } from './dto/user.dto';
import { IResponse } from 'src/util/generic-responsive';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByCPF(cpf: string): Promise<IResponse<UserDTO>> {
    const data = await this.userRepository.findOne({
      where: { cpf: cpf },
      relations: { company: true },
    });

    if (!data)
      return {
        HttpException: new HttpException(
          { message: 'Não foi possivel encontrar este utilizador' },
          HttpStatus.NO_CONTENT,
        ),
      };
    return {
      HttpException: new HttpException(
        { data, message: 'CPF em utilização' },
        HttpStatus.OK,
      ),
      data: data,
    };
  }

  async findByEmail(email: string): Promise<IResponse<UserDTO>> {
    const data = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!data)
      return {
        HttpException: new HttpException(
          { message: 'Não foi possivel encontrar este utilizador' },
          HttpStatus.NO_CONTENT,
        ),
      };
    return {
      HttpException: new HttpException(
        { data, message: 'Utilizador existente' },
        HttpStatus.OK,
      ),
      data: data,
    };
  }

  async create(data: UserDTO): Promise<IResponse<UserDTO>> {
    try {
      const userData = this.userRepository.create({
        ...data,
        email: data.email.toLowerCase(),
      });
      await this.userRepository.save(userData);
      return {
        HttpException: new HttpException(
          { message: 'Utilizador criado com sucesso' },
          HttpStatus.CREATED,
        ),
        data: userData,
      };
    } catch (error) {
      return {
        HttpException: new HttpException(
          { message: 'Erro interno' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      };
    }
  }
}
