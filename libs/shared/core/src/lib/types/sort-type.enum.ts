export const SortType = {
  CreateDate: 'createDate',
  //Price: 'price',
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
