export const OrderAction = {
  Start: 'start',
  Done: 'done',
} as const;

export type OrderAction = (typeof OrderAction)[keyof typeof OrderAction];
