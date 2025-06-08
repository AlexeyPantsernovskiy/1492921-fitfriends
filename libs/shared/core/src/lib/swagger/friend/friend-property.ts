import { REQUEST_TRAIN } from '../../constants/data';

export const FriendProperty = {
  FriendId: {
    Description: {
      description: 'Идентификатор пользователя, добавленного в друзья (ID)',
      example: '683bff2da821c29d2dd9e4c1',
    },
    Validate: {
      Message:
        'Идентификатор пользователя, добавленного в друзья должен быть корректным MongoID',
    },
  },
  RequestUserId: {
    Description: {
      description:
        'Идентификатор пользователя, добавившего запрос на совместную тренировку (ID)',
      example: '683bff2da821c29d2dd9e4c1',
    },
    Validate: {
      Message:
        'Идентификатор пользователя, добавившего запрос на совместную тренировку должен быть корректным MongoID',
    },
  },
  RequestTrain: {
    Description: {
      description: 'Мнемокод запроса на тренировку',
      enum: REQUEST_TRAIN,
      example: REQUEST_TRAIN[0],
    },
    Validate: {
      Message: `Мнемокод запроса на тренировку должен быть одним из значений (${REQUEST_TRAIN.join(', ')})`,
    },
  },
} as const;
