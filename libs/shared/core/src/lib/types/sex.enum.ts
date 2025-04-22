export const Sex = {
  Man: 'man',
  Female: 'female',
  Empty: 'empty',
} as const;

export const SexName = {
  [Sex.Man]: 'Мужской',
  [Sex.Female]: 'Женский',
  [Sex.Empty]: 'Неважно',
} as const;

export const SexNameForTraining = {
  [Sex.Man]: 'для мужчин',
  [Sex.Female]: 'для женщин',
  [Sex.Empty]: 'для всех',
} as const;

export type Sex = (typeof Sex)[keyof typeof Sex];
