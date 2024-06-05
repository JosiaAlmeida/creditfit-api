import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Representative } from './representative.entity';
import { Repository } from 'typeorm';
import { IRepresentativeService } from './interfaces/representative.service.interface';
import { IResponse } from 'src/util/generic-responsive';
import { CreateRepresentativeDTO } from './dto/create-representative.dto';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class RepresentativeService implements IRepresentativeService {
  constructor(
    @InjectRepository(Representative)
    private readonly representativeRepository: Repository<Representative>,
  ) {}

  async findByUser(user: UserDTO): Promise<IResponse<CreateRepresentativeDTO>> {
    const data = await this.representativeRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!data)
      return {
        HttpException: new HttpException(
          { message: 'Não foi possivel encontrar este representante' },
          HttpStatus.NO_CONTENT,
        ),
      };
    return {
      HttpException: new HttpException(
        { data, message: 'Representante encontrado' },
        HttpStatus.OK,
      ),
      data: data,
    };
  }
  async findByCNPJ(cnpj: string): Promise<IResponse<CreateRepresentativeDTO>> {
    const data = await this.representativeRepository.findOne({
      where: { cnpj: cnpj },
    });
    if (!data)
      return {
        HttpException: new HttpException(
          { message: 'CNPJ não encontrado' },
          HttpStatus.NO_CONTENT,
        ),
      };
    return {
      HttpException: new HttpException(
        { message: 'CNPJ encontrado' },
        HttpStatus.OK,
      ),
      data: data,
    };
  }
  async create(
    data: CreateRepresentativeDTO,
  ): Promise<IResponse<CreateRepresentativeDTO>> {
    try {
      const saveData = this.representativeRepository.create(data);
      await this.representativeRepository.save(saveData);
      return {
        HttpException: new HttpException(
          { message: 'Representante criado' },
          HttpStatus.CREATED,
        ),
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
