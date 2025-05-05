export const SortType = {
  Date: 'createDate',
  Price: 'price',
  Rating: 'rating',
  Quantity: 'quantity',
  Amount: 'amount',
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
