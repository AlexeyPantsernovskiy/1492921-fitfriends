import { Specialization } from '../types/specialization.enum';

export const EMPTY_VALUE = '~~~empty~~~';

export const PREFIX_LOCATION = 'ст.м.';

export const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
];

export const SEX = ['Мужской', 'Женский', 'Неважно'] as const;

export const SPECIALIZATIONS = Object.keys(Specialization);

export const LEVELS = ['Новичок', 'Любитель', 'Профессионал'] as const;

export const TIMES = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  '80-100 мин',
] as const;

export const DefaultPhoto = {
  UserCard1: 'default-photo/user-card-photo1.jpg',
  UserCard2: 'default-photo/user-card-photo2.jpg',
} as const;
