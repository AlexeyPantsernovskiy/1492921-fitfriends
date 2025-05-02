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
  NotFound: '/404',

  Friends: '/friends',

  Purchases: '/purchases',
  Catalog: '/catalog',
  TrainingCard: '/training/:id',
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
  Trainings: '/api/trainings',
  SpecialForYou: '/api/trainings/special-for-you',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum StoreSlice {
  TrainingProcess = 'TRAINING_PROCESS',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export const TokenName = {
  Access: 'fitfriends-access-token',
  Refresh: 'fitfriends-refresh-token',
};

export const BACKEND_URL = 'http://localhost:3000';
export const REQUEST_TIMEOUT = 5000;

export const LimitTrainingCard = {
  SpecialForYou: 9,
  Catalog: 6,
  SliderSpecialForYou: 3,
  SliderSpecialOffers: 3,
  SliderPopular: 4,
  SliderFriends: 4,
} as const;

export const LimitPersonalAccount = {
  SliderCertificate: 3,
} as const;

// Размер скидки которая применяется при установки флага "Специальное предложение"
export const discount = 0.2;

export const ToggleRange = {
  Min: 'min',
  Max: 'max',
} as const;
