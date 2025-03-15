import { SortDirection, SortType } from '@project/shared-core';
import { InputProps } from './components/input/input';

export enum ProductCardTab {
  Characteristics = 'characteristics',
  Description = 'description',
}

export const DEFAULT_PRODUCT_CARD_TAB = ProductCardTab.Characteristics;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Register = '/register',
  QuestionnaireUser = '/questionnaire-user/:userId',

  Account = '/account',
  Purchases = '/purchases',
  Catalog = '/catalog',
  TrainingCard = '/training/:id',

  // Убрать
  Products = '/products',
  Add = '/add',
  Edit = '/edit',
  NotFound = '/404',
}

export const ApiRoute = {
  ShopProducts: '/api/shop/products',
  ShopProductTypes: '/api/shop/product-types',
  UserCheckAuth: '/api/users/check',
  UserLogin: '/api/users/login',
  UserLogout: '/api/users/logout',
  UserRegister: '/api/users/register',
  TokenRefresh: '/api/users/refresh',
  Questionnaire: '/api/users/:userId/questionnaire',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

// export enum SortDirection {
//   Desc = 'desc',
//   Asc = 'asc',
// }

// export enum SortType {
//   CreateDate = 'createDate',
//   //Price = 'price',
// }

export const DefaultSort = {
  Direction: SortDirection.Asc,
  Type: SortType.CreateDate,
} as const;

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export const TokenName = {
  Access: 'guitar-shop-access-token',
  Refresh: 'guitar-shop-refresh-token',
};

export const BACKEND_URL = 'http://localhost:3000';
export const REQUEST_TIMEOUT = 5000;

export const InputField = {
  Name: { name: 'name', caption: 'Имя', type: 'text' },
  Email: { name: 'email', caption: 'E-mail', type: 'email' },
  Birthday: {
    name: 'birthday',
    caption: 'Дата рождения',
    type: 'date',
    max: '2099-12-31',
    required: false,
  },
  Password: { name: 'password', caption: 'Пароль', type: 'password' },
} as const satisfies Record<string, InputProps>;
