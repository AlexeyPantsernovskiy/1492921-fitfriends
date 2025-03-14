import { Questionnaire } from './questionnaire.interface';
import { UserRegister } from './user-register.interface';

export interface User extends Omit<UserRegister, 'password'> {
  id?: string;
  description?: string;
  photo1: string;
  photo2: string;
  registerDate?: Date;
  questionnaire?: Questionnaire;
}
