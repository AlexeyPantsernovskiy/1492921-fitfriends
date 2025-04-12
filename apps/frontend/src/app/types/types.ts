import { AxiosInstance } from 'axios';
import { History } from 'history';

import { AppRoute, ToggleRange } from '@frontend/const';

export type RouteApp = (typeof AppRoute)[keyof typeof AppRoute];

export type GuitarTypeInfo = {
  code: string;
  name: string;
  countStrings: number[];
};
export type GuitarType = Record<string, GuitarTypeInfo>;

export type Product = {
  id: string;
  name: string;
  description: string;
  createDate: Date;
  photo: string;
  typeCode: string;
  barcode: string;
  price: number;
};

export type Guitar = Product & {
  countStrings: number;
};

export type ProductWithPagination = {
  entities: Product[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

export type ApiExtra = {
  api: AxiosInstance;
  history: History;
};

export type RangeValue = { min: number; max: number };

export type ToggleMinMax = (typeof ToggleRange)[keyof typeof ToggleRange];
