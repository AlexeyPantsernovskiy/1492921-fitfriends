export const PaymentType = {
  visa: 'visa',
  mir: 'mir',
  umoney: 'umoney',
} as const;

export type PaymentType = keyof typeof PaymentType;
