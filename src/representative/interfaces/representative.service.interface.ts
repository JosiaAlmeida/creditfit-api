import { IResponse } from 'src/util/generic-responsive';
import { CreateRepresentativeDTO } from '../dto/create-representative.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export interface IRepresentativeService {
  findByUser(user: UserDTO): Promise<IResponse<CreateRepresentativeDTO>>;
  findByCNPJ(cnpj: string): Promise<IResponse<CreateRepresentativeDTO>>;
  create(
    data: CreateRepresentativeDTO,
  ): Promise<IResponse<CreateRepresentativeDTO>>;
}
