import { User } from '../user.entity';
import { UserDTO } from '../dto/user.dto';
import { IResponse } from 'src/util/generic-responsive';

export interface IUserService {
  findByEmail(email: string): Promise<IResponse<UserDTO>>;
  findByCPF(cpf: string): Promise<IResponse<UserDTO>>;
  create(data: UserDTO): Promise<IResponse<UserDTO>>;
}
