export const UserOperation = {
  Register: { summary: 'Регистрация нового пользователя' },
  Login: { summary: 'Авторизация пользователя' },
  GetUser: { summary: 'Получение информации о пользователе' },
  RefreshTokens: { summary: 'Обновление токенов' },
  Check: { summary: 'Проверка access токена' },
  FillUserQuestionnaire: { summary: 'Заполнение опросника пользователя' },
  FillCoachQuestionnaire: { summary: 'Заполнение опросника тренера' },
  GetQuestionnaire: { summary: 'Получение результатов опроса пользователя' },
  Update: { summary: 'Изменение данных о пользователе' },
  DeleteAvatar: { summary: 'Удаление аватара пользователя' },
  UpdateAvatar: { summary: 'Изменение аватара пользователя' },
} as const;
