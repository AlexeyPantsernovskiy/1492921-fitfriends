import { SortDirection, SortType } from '@project/shared';

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
  Main = '/main',
  Intro = '/intro',
  PersonalAccount = '/personal-account',
  NotFound = '/404',

  Friends = '/friends',

  Purchases = '/purchases',
  Catalog = '/catalog',
  TrainingCard = '/training/:id',

  // Убрать
  Products = '/products',
  Add = '/add',
  Edit = '/edit',
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
  UserUpdate: '/api/users/update',
  UserGetInfo: '/api/users/:userId',
  UserAvatar: '/api/users/avatar',
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
