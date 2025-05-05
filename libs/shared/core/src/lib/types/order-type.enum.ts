export const OrderType = {
  Ticket: 'ticket',
  Promo: 'promo',
} as const;

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
