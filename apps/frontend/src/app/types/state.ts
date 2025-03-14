import store from '@frontend/store';
import type { Guitar, GuitarType, ProductWithPagination } from './types';
import { AuthorizationStatus } from '@frontend/src/const';
import { SortType, User } from '@project/shared-core';

export type SiteData = {
  guitarTypes: GuitarType | null;
  products: ProductWithPagination;
  isProductsLoading: boolean;
  product: Guitar | null;
  isProductLoading: boolean;
};

export type SiteProcess = {
  sorting: SortType;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
