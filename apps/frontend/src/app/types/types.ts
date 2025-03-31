import { AxiosInstance } from 'axios';
import { History } from 'history';

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Register: '/register',
  QuestionnaireUser: '/questionnaire-user/:userId',
  Main: '/main',
  Intro: '/intro',
  PersonalAccount: '/personal-account',
  NotFound: '/404',

  Friends: '/friends',

  Purchases: '/purchases',
  Catalog: '/catalog',
  TrainingCard: '/training/:id',
} as const;
export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

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
