export const Level = {
  Beginner: 'beginner',
  Amateur: 'amateur',
  Professional: 'professional',
} as const;

export const LevelName = {
  [Level.Beginner]: 'Новичок',
  [Level.Amateur]: 'Любитель',
  [Level.Professional]: 'Профессионал',
} as const;

export type Level = (typeof Level)[keyof typeof Level];
