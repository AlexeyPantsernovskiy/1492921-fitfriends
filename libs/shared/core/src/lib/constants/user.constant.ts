import { Duration } from '../types/duration.enum';
import { Level } from '../types/level.enum';
import { Sex } from '../types/sex.enum';
import { SPECIALIZATIONS } from './data';

export const SALT_ROUNDS = 10;

export const UserErrorMessage = {
  EmailExists: 'Пользователь с таким email уже существует',
  UserNotFound: 'Пользователь не найден',
  PasswordWrong: 'Неверный пароль пользователя',
  UserLogout: 'Пользователю необходимо выйти из системы',
  QuestionnaireBad: 'Опросник не соответствует роли пользователя',
} as const;

export const UserLimit = {
  Name: {
    MinLength: 1,
    MaxLength: 15,
  },
  Password: {
    MinLength: 6,
    MaxLength: 12,
  },
  AvatarFile: {
    FileExtRegExp: /\.(jpg|jpeg|png)$/,
    MaxSize: 1024 * 1024,
  },
  PhotoFile: {
    FileExtRegExp: /\.(jpg|jpeg|png)$/,
  },
  Description: {
    MinLength: 10,
    MaxLength: 140,
  },
  Specialization: {
    MinCount: 1,
    MaxCount: 3,
  },
  CaloriesLose: {
    Min: 1000,
    Max: 5000,
  },
  CaloriesWaste: {
    Min: 1000,
    Max: 5000,
  },
  CertificateFile: {
    FileExtRegExp: /\.pdf$/,
  },
  Achievements: {
    MinLength: 10,
    MaxLength: 140,
  },
};

export const QuestionnaireDefault = {
  [Sex.Female]: {
    caloriesLose: 2300,
    caloriesWaste: 2300,
    specialization: SPECIALIZATIONS,
    level: Level.Amateur,
    duration: Duration.Minutes30_50,
    isReadyToTrain: true,
  },
  [Sex.Man]: {
    caloriesLose: 3300,
    caloriesWaste: 3300,
    specialization: SPECIALIZATIONS,
    level: Level.Amateur,
    duration: Duration.Minutes30_50,
    isReadyToTrain: true,
  },
  [Sex.Empty]: {
    caloriesLose: 3000,
    caloriesWaste: 3000,
    specialization: SPECIALIZATIONS,
    level: Level.Amateur,
    duration: Duration.Minutes30_50,
    isReadyToTrain: true,
  },
} as const;
