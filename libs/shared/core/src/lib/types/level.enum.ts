export const Level = {
  beginner: 'Новичок',
  amateur: 'Любитель',
  professional: 'Профессионал',
} as const;

export type Level = keyof typeof Level;
