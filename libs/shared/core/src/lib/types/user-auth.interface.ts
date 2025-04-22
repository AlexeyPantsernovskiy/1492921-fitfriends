import {
  CoachQuestionnaire,
  UserQuestionnaire,
} from './questionnaire.interface';
import { UserRole } from './user-role.enum';
import { UserBase } from './user.interface';

export interface UserAuthBase extends UserBase {
  passwordHash?: string;
}

export interface UserAuthSportsman extends UserAuthBase {
  role: typeof UserRole.Sportsman;
  questionnaire?: UserQuestionnaire;
}

export interface UserAuthCoach extends UserAuthBase {
  role: typeof UserRole.Coach;
  questionnaire?: CoachQuestionnaire;
}

export type UserAuth = UserAuthSportsman | UserAuthCoach;
