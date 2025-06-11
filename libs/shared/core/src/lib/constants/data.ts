import { Duration } from '../types/duration.enum';
import { Level } from '../types/level.enum';
import { RequestTrain } from '../types/request-train.enum';
import { Sex } from '../types/sex.enum';
import { Specialization } from '../types/specialization.enum';
import { UserRole } from '../types/user-role.enum';

export const EMPTY_VALUE = '~~~empty~~~';

export const PREFIX_LOCATION = 'ст.м.';

export const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
];

export const SEX = Object.values(Sex);
export const SPECIALIZATIONS = Object.keys(Specialization);
export const LEVELS = Object.values(Level);
export const DURATIONS = Object.values(Duration);
export const REQUEST_TRAIN = Object.values(RequestTrain);

export const DefaultFile = {
  UserCard: {
    [UserRole.Sportsman]: {
      photo1: 'img/content/user-card-photo1.jpg',
      photo2: 'img/content/user-card-photo2.jpg',
    },
    [UserRole.Coach]: {
      photo1: 'img/content/user-coach-photo1.jpg',
      photo2: 'img/content/user-coach-photo2.jpg',
    },
  },
} as const;
