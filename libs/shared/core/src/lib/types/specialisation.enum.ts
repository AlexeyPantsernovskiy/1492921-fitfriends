export const Specialisation = {
  yoga: 'Йога',
  running: 'Бег',
  boxing: 'Бокс',
  stretching: 'Стрейчинг',
  crossfit: 'Кроссфит',
  aerobics: 'Аэробика',
  pilates: 'Пилатес',
} as const;

export type Specialisation = keyof typeof Specialisation;
