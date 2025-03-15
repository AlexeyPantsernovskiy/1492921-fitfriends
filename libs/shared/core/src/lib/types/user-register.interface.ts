import { Sex } from './sex.enum';
import { UserLogin } from './user-login.interface';
import { UserRole } from './user-role.enum';

export interface UserRegister extends UserLogin {
  name: string;
  avatar?: string;
  sex: Sex;
  birthday?: Date;
  location: string;
  role: UserRole;
}
