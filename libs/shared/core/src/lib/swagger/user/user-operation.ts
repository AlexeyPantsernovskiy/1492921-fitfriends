export const UserOperation = {
  Register: { summary: 'Регистрация нового пользователя' },
  Login: { summary: 'Авторизация пользователя' },
  GetUser: { summary: 'Получение информации о пользователе' },
  RefreshTokens: { summary: 'Обновление токенов' },
  Check: { summary: 'Проверка access токена' },
  FillQuestionnaire: { summary: 'Заполнение опросника пользователя' },
  GetQuestionnaire: { summary: 'Получение результатов опроса пользователя' },
  Update: { summary: 'Изменение данных о пользователе' },
  DeleteAvatar: { summary: 'Удаление аватара пользователя' },
  UpdateAvatar: { summary: 'Изменение аватара пользователя' },
} as const;
