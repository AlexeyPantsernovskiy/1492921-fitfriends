export const UserRole = {
  Coach: 'coach',
  Sportsman: 'sportsman',
} as const;

export const UserRoleInfo = {
  [UserRole.Coach]: {
    caption: 'Я хочу тренировать',
    readyCaption: 'Готов тренировать',
    isDefault: false,
    isDisabled: true,
  },
  [UserRole.Sportsman]: {
    caption: 'Я хочу тренироваться',
    readyCaption: 'Готов тренироваться',
    isDefault: true,
    isDisabled: false,
  },
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
