export const PaymentType = {
  Visa: 'visa',
  Mir: 'mir',
  Umoney: 'umoney',
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
