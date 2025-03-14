export const Role = {
  Coach: 'coach',
  Sportsman: 'sportsman',
} as const;

export const UserRole = {
  Coach: {
    code: Role.Coach,
    caption: 'Я хочу тренировать',
    isDefault: false,
    isDisabled: true,
  },
  Sportsman: {
    code: Role.Sportsman,
    caption: 'Я хочу тренироваться',
    isDefault: true,
    isDisabled: false,
  },
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole]['code'];
