import { Duration } from '../types/duration.enum';
import { Level } from '../types/level.enum';
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

// export const mockUsersLookForCompany = [
//   {
//     name: 'Диана',
//     location: 'Невский проспект',
//     specialization: 'pilates' as Specialization,
//     avatar: 'user-04',
//   },
//   {
//     name: 'Константин',
//     location: 'Комендантский проспект',
//     specialization: 'boxing' as Specialization,
//     avatar: 'user-05',
//   },
//   {
//     name: 'Иван',
//     location: 'Чёрная речка',
//     specialization: 'running' as Specialization,
//     avatar: 'user-06',
//   },
//   {
//     name: 'Яна',
//     location: 'Крестовский остров',
//     specialization: 'pilates' as Specialization,
//     avatar: 'user-03',
//   },
//   {
//     name: 'Оксана',
//     location: 'Петроградская',
//     specialization: 'yoga' as Specialization,
//     avatar: 'user-01',
//   },
// ];
