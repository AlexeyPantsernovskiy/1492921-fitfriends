export const SortType = {
  Date: 'createDate',
  Price: 'price',
  Rating: 'rating',
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
