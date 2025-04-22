export const Duration = {
  Minutes10_30: 'minutes10_30',
  Minutes30_50: 'minutes30_50',
  Minutes50_80: 'minutes50_80',
  Minutes80_100: 'minutes80_100',
} as const;

export const DurationName = {
  [Duration.Minutes10_30]: '10-30 мин',
  [Duration.Minutes30_50]: '30-50 мин',
  [Duration.Minutes50_80]: '50-80 мин',
  [Duration.Minutes80_100]: '80-100 мин',
} as const;

export type Duration = (typeof Duration)[keyof typeof Duration];
