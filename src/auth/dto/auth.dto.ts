import { UserDTO } from 'src/user/dto/user.dto';

export class AuthDTO {
  user: UserDTO;
  access_token: string;
}
