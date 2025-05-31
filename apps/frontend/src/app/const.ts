export const AppRoute = {
  Root: '/',
  Login: '/login',
  Register: '/register',
  QuestionnaireUser: '/questionnaire-user',
  QuestionnaireCoach: '/questionnaire-coach',
  Main: '/main',
  Intro: '/intro',
  PersonalAccount: '/personal-account',
  CreateTraining: '/create-training',
  Catalog: '/catalog',
  MyTraining: '/my-training',
  MyOrders: '/my-orders',
  TrainingCard: '/training/:id',
  Friends: '/friends',
  MyPurchases: '/my-purchases',
  UserCard: '/user-card/:id',
  NotFound: '/404',
} as const;

export const ApiRoute = {
  UserCheckAuth: '/api/users/check',
  UserLogin: '/api/users/login',
  UserLogout: '/api/users/logout',
  UserRegister: '/api/users/register',
  TokenRefresh: '/api/users/refresh',
  Questionnaire: '/api/users/questionnaire',
  QuestionnaireUser: '/api/users/questionnaire-user',
  QuestionnaireCoach: '/api/users/questionnaire-coach',
  UpdateCertificates: '/api/users/certificates',
  UserUpdate: '/api/users/update',
  UserGetInfo: '/api/users/:userId',
  UsersReadyToTrain: '/api/users/ready-to-train',
  Trainings: '/api/trainings',
  SpecialForYou: '/api/trainings/special-for-you',
  Orders: '/api/orders',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum StoreSlice {
  TrainingProcess = 'TRAINING_PROCESS',
  OrderProcess = 'ORDER_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export const TokenName = {
  Access: 'fitfriends-access-token',
  Refresh: 'fitfriends-refresh-token',
};

export const BACKEND_URL = 'http://localhost:3000';
export const REQUEST_TIMEOUT = 5000;

export const Limits = {
  SpecialForYou: 9,
  Catalog: 6,
  SliderSpecialForYou: 3,
  SliderSpecialOffers: 3,
  SliderPopular: 4,
  SliderLookForCompany: 4,
  SliderCertificate: 3,
  MyTraining: 6,
  MyOrders: 4,
  MyPurchases: 6,
  LookForCompany: 8,
} as const;

// Размер скидки которая применяется при установки флага "Специальное предложение"
export const DISCOUNT = 0.1;

export const ToggleRange = {
  Min: 'min',
  Max: 'max',
} as const;

export const DEFAULT_FILTER_PURCHASE_ACTIVE = true;
