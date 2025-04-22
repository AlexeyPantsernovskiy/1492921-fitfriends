import {
  CoachQuestionnaire,
  UserQuestionnaire,
} from './questionnaire.interface';
import { UserRegister } from './user-register.interface';
import { UserRole } from './user-role.enum';

export interface UserBase extends Omit<UserRegister, 'password'> {
  id?: string;
  description?: string;
  photo1: string;
  photo2: string;
  registerDate?: Date;
}

export interface UserSportsman extends UserBase {
  role: typeof UserRole.Sportsman;
  description?: string;
  photo1: string;
  photo2: string;
  registerDate?: Date;
  questionnaire?: UserQuestionnaire;
}

export interface UserCoach extends UserBase {
  role: typeof UserRole.Coach;
  description?: string;
  photo1: string;
  photo2: string;
  registerDate?: Date;
  questionnaire?: CoachQuestionnaire;
}

export type User = UserSportsman | UserCoach;
