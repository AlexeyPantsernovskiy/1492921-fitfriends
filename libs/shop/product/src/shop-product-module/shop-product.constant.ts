import { SortDirection, SortType } from '@project/shared-core';

export const NO_UPDATE_PHOTO = '~~no-update-file~~';

export const ShopProductError = {
  ProductNotFound: 'Товар не найден',
} as const;

export const ShopProductPaginationDefault = {
  CountLimit: 7,
  PageCurrent: 1,
  CountSearch: 7,
} as const;

export const ShopProductSortDefault = {
  Direction: SortDirection.Asc,
  Type: SortType.CreateDate,
} as const;
