export const UserOperation = {
  Register: { summary: 'Регистрация нового пользователя' },
  Login: { summary: 'Авторизация пользователя' },
  GetUser: { summary: 'Получение информации о пользователе' },
  RefreshTokens: { summary: 'Обновление токенов' },
  Check: { summary: 'Проверка access токена' },
  FillQuestionnaire: { summary: 'Заполнение опросника' },
  GetQuestionnaire: { summary: 'Получение результатов опроса' },
} as const;
