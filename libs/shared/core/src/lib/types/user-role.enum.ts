export const UserRole = {
  Coach: 'coach',
  Sportsman: 'sportsman',
} as const;

export const UserRoleInfo = {
  [UserRole.Coach]: {
    caption: 'Я хочу тренировать',
    readyCaption: 'Готов тренировать',
    notReadyCaption: 'Не готов тренировать',
    isDefault: false,
  },
  [UserRole.Sportsman]: {
    caption: 'Я хочу тренироваться',
    readyCaption: 'Готов к\u00A0тренировке',
    notReadyCaption: 'Не готов к\u00A0тренировке',
    isDefault: true,
  },
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
