import { HttpStatus } from '@nestjs/common';

import { LoggedUserRdo, UserRdo, UserTokenRdo } from '../../rdo/user.rdo';
import { TokenPayloadRdo } from '../../rdo/token-payload.rdo';

export const UserResponse = {
  LoggedSuccess: {
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'Пользователь успешно вошел в систему',
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Введен неверный пароль или логин',
  },
  UserFound: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Пользователь найден',
  },
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  },
  UserExist: {
    status: HttpStatus.CONFLICT,
    description: 'Пользователь с таким email уже существует',
  },
  UserCreated: {
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'Новый пользователь был успешно создан',
  },
  // PasswordUpdated: {
  //   status: HttpStatus.CREATED,
  //   description: 'Пароль пользователя был успешно обновлен',
  // },
  UserNotAuth: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  },
  GetTokens: {
    type: UserTokenRdo,
    status: HttpStatus.CREATED,
    description: 'Получены новые токены',
  },
  CheckSuccess: {
    type: TokenPayloadRdo,
    status: HttpStatus.OK,
    description: 'Проверка access токена прошла успешно',
  },
  UserAuthForbidden: {
    status: HttpStatus.FORBIDDEN,
    description: 'Запрещено для авторизованных пользователей',
  },
} as const;
