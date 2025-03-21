export const Specialization = {
  yoga: 'Йога',
  running: 'Бег',
  boxing: 'Бокс',
  stretching: 'Стрейчинг',
  crossfit: 'Кроссфит',
  aerobics: 'Аэробика',
  pilates: 'Пилатес',
} as const;

export type Specialization = keyof typeof Specialization;
