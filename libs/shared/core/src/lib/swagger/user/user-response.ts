import { HttpStatus } from '@nestjs/common';

import { TokenPayloadRdo } from '../../rdo/user/token-payload.rdo';
import { LoggedUserRdo } from '../../rdo/user/logged-user.rdo';
import { UserRdo } from '../../rdo/user/user.rdo';
import { UserTokenRdo } from '../../rdo/user/user-token.rdo';
import { UserWithPaginationRdo } from '../../rdo/user/user-with-pagination.rdo';

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
  UserUpdated: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Данные о пользователе были успешно изменены',
  },
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
  AvatarDeleted: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Аватар пользователя удален',
  },
  AvatarUpdated: {
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Аватар пользователя изменен',
  },
  Users: {
    status: HttpStatus.OK,
    description: 'Список пользователей получен',
    type: UserWithPaginationRdo,
  },
  UsersNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователи не найдены',
  },
  NotAccessCoach: {
    status: HttpStatus.FORBIDDEN,
    description: 'Недоступно для тренера',
  },
} as const;
