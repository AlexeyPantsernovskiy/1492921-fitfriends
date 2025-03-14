import { HttpStatus } from '@nestjs/common';

export const CommonResponse = {
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректный запрос',
  },
  UserNotAuth: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизован',
  },
} as const;
