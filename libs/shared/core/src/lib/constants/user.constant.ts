export const SALT_ROUNDS = 10;

export const UserErrorMessage = {
  EmailExists: 'Пользователь с таким email уже существует',
  UserNotFound: 'Пользователь не найден',
  PasswordWrong: 'Неверный пароль пользователя',
  UserLogout: 'Пользователю необходимо выйти из системы',
} as const;
