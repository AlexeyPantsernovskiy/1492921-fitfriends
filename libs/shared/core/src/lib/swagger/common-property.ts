export const CommonProperty = {
  UserId: {
    Description: {
      description: 'ID зарегистрированного пользователя',
      example: '6766fdb720f78014bf83d5a3',
      required: false,
    },
    Validate: {
      Message: 'Идентификатор пользователя должен быть корректным MongoId',
    },
  },
  UserIdNotNull: {
    Description: {
      description: 'ID зарегистрированного пользователя',
      example: '6766fdb720f78014bf83d5a3',
      required: true,
    },
    Validate: {
      Message: 'Идентификатор пользователя должен быть корректным MongoId',
    },
  },
  TotalPages: {
    Description: {
      description: 'Общее количество страниц',
      example: 10,
    },
  },
  TotalItems: {
    Description: {
      description: 'Общее количество элементов',
      example: 200,
    },
  },
  CurrentPage: {
    Description: {
      description: 'Номер текущей страницы',
      example: 1,
      required: false,
    },
  },
  ItemsPerPage: {
    Description: {
      description: 'Количество элементов на странице',
      example: 9,
    },
  },
} as const;
