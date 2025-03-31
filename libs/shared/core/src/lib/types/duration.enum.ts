export const Duration = {
  minutes10_30: '10-30 мин',
  minutes30_50: '30-50 мин',
  minutes50_80: '50-80 мин',
  minutes80_100: '80-100 мин',
} as const;
export type Duration = keyof typeof Duration;
