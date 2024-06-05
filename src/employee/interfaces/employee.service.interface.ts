import { IResponse } from 'src/util/generic-responsive';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export interface IEmployeeService {
  findByUser(user: UserDTO): Promise<IResponse<CreateEmployeeDTO>>;
  create(data: CreateEmployeeDTO): Promise<IResponse<CreateEmployeeDTO>>;
}
