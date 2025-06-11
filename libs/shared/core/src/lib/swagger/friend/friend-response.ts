import { HttpStatus } from '@nestjs/common';

import { FriendRdo } from '../../rdo/friend/friend.rdo';
import { UserWithPaginationRdo } from '../../rdo/user/user-with-pagination.rdo';

export const FriendResponse = {
  FriendsFound: {
    status: HttpStatus.OK,
    description: 'Список друзей получен',
    type: UserWithPaginationRdo,
  },
  FriendAdded: {
    type: FriendRdo,
    status: HttpStatus.CREATED,
    description: 'Пользователь добавлен в друзья',
  },
  FriendDeleted: {
    status: HttpStatus.OK,
    description: 'Пользователь удален из друзей',
  },
  FriendNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден в списке друзей',
  },
  AddingSelf: {
    status: HttpStatus.FORBIDDEN,
    description: 'Запрещено добавлять в друзья самого себя (userId = friendId)',
  },
  RecordExists: {
    status: HttpStatus.CONFLICT,
    description: 'Эти пользователи уже являются друзьями',
  },
  RequestComplete: {
    status: HttpStatus.OK,
    description: 'Запрос на тренировку обработан',
  },
  RequestSelf: {
    status: HttpStatus.FORBIDDEN,
    description: 'Запрещено обрабатывать свои запросы',
  },
  RequestExists: {
    status: HttpStatus.CONFLICT,
    description: 'Запрос на тренировку уже отправлен',
  },
  RequestNotExists: {
    status: HttpStatus.NOT_FOUND,
    description: 'Запрос на тренировку еще не был отправлен',
  },
  RequestEnd: {
    status: HttpStatus.FORBIDDEN,
    description: 'Запрос на тренировку ранее был обработан',
  },
} as const;
