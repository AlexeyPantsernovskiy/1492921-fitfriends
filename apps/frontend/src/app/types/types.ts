import { AxiosInstance } from 'axios';
import { History } from 'history';

// export type User = {
//   name: string;
//   email: string;
// };

// export type UserRegister = User & {
//   name: string;
//   email: string;
//   password: string;
// };

// export type UserLogin = {
//   email: string;
//   password: string;
// };

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
