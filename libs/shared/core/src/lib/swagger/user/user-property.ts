import { LOCATIONS, SEX } from '../../constants/data';
import { FileLoading } from '../../constants/file-vault.constant';
import { UserLimit } from '../../constants/user.constant';
import { QuestionnaireUserRdo } from '../../rdo/user/questionnaire.rdo';
import { UserRole } from '../../types/user-role.enum';

export const UserProperty = {
  Id: {
    Description: {
      description: 'Идентификатор пользователя (ID)',
      example: '67947fc34444fac62a805fb8',
    },
    Validate: {
      Message: 'Идентификатор пользователя должен быть корректным MongoID',
    },
  },
  Email: {
    Description: {
      description: 'Еmail пользователя',
      example: 'user@user.ru',
    },
    Validate: { Message: 'Некорректный email' },
  },
  Password: {
    Description: {
      description: 'Пароль пользователя',
      example: '123456',
    },
    Validate: {
      ...UserLimit.Password,
      Message: `Длина пароля должна быть от ${UserLimit.Password.MinLength} до ${UserLimit.Password.MaxLength} символов`,
    },
  },
  Name: {
    Description: {
      description: 'Имя пользователя',
      example: 'Катя Петрова',
    },
    Validate: {
      ...UserLimit.Name,
      Message: `Имя пользователя должно быть не более ${UserLimit.Name.MaxLength} символов`,
    },
  },
  Avatar: {
    Description: {
      description: 'Путь к файлу с аватаркой пользователя',
      example: 'img/avatar/user-photo.jpg',
    },
  },
  AvatarFile: {
    Description: {
      type: 'string',
      description: 'Файл с фото пользователя для аватарки',
      example: '/images/avatar/5.jpg',
      format: 'binary',
      required: false,
    },
    Validate: {
      ...UserLimit.AvatarFile,
      Message: `Разрешено загружать фото в формате .jpg или .png размером не более ${UserLimit.AvatarFile.MaxSize / 1024 / 1024} Mb`,
    },
  },
  Sex: {
    Description: {
      description: 'Пол (man, female, empty)',
      enum: SEX,
      example: 'female',
    },
    Validate: {
      Message: `Пол должен быть одним из вариантов: ${SEX.join(', ')}`,
    },
  },
  Birthday: {
    Description: {
      description: 'Дата рождения',
      required: false,
      example: '1986-11-27',
    },
  },
  Description: {
    Description: {
      description: 'Текст с общей информацией',
      required: false,
      example:
        'Привет! Я Катерина и мне 27 лет. Обожаю спорт и все, что с ним связанно.',
    },
    Validate: {
      ...UserLimit.Description,
      Message: `Длина текста с общей информацией должна быть от ${UserLimit.Description.MinLength} до ${UserLimit.Description.MaxLength} символов`,
    },
  },
  Location: {
    Description: {
      description: 'Станция метро',
      enum: LOCATIONS,
      example: 'Петроградская',
    },
    Validate: {
      Message: `Станция метро должна быть одним из вариантов: ${LOCATIONS.join(', ')}`,
    },
  },
  Photo: {
    Description: {
      description: 'Путь к файлу с фото для карточки пользователя',
      example: 'img/photos/user-card-photo.jpg',
    },
  },
  PhotoFile: {
    Description: {
      type: 'string',
      description: 'Файл с фото для карточки пользователя',
      example: '/images/avatar/5.jpg',
      format: 'binary',
    },
    Validate: {
      FileExtRegExp: FileLoading.Avatar.FileExtRegExp,
      Message: 'Разрешено загружать фото в формате .jpg или .png',
    },
  },
  RegisterDate: {
    Description: {
      description: 'Дата регистрации пользователя (ISO format)',
      example: '2024-10-31T11:54:13.605Z',
    },
  },
  Role: {
    Description: {
      description: 'Роль пользователя в системе (coach/sportsman)',
      enum: Object.values(UserRole),
      example: 'sportsman',
    },
    Validate: {
      Message: `Роль пользователя должна быть одним из вариантов: ${Object.values(UserRole).join(', ')}`,
    },
  },
  Questionnaire: {
    Description: {
      description: 'Опросник пользователя',
      type: QuestionnaireUserRdo,
      example: `{
  "specialization": [
    "running",
    "stretching"
  ],
  "duration": "minutes30_50",
  "level": "beginner",
  "caloriesLose": 3000,
  "caloriesWaste": 2000,
  "isReadyToTrain": true
}`,
    },
  },
  AccessToken: {
    Description: {
      description: 'Access токен пользователя',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzk0N2ZjMzQ0NDRmYWM2MmE4MDVmYjgiLCJlbWFpbCI6IkFJQG5tYWlsLnJ1IiwibmFtZSI6IkFsZXhleSBJdmFub3YiLCJpYXQiOjE3Mzc4OTQ2MTIsImV4cCI6MTczNzg5NDkxMn0.oU8NF3Rsub-Y-77FNhmcsg1mhkRoneSSl5wO6siUy6g',
    },
  },
  RefreshToken: {
    Description: {
      description: 'Refresh токен пользователя',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Nzk0N2ZjMzQ0NDRmYWM2MmE4MDVmYjgiLCJlbWFpbCI6IkFJQG5tYWlsLnJ1IiwibmFtZSI6IkFsZXhleSBJdmFub3YiLCJ0b2tlbklkIjoiZjQ4ZmI4MjUtYjhiMy00MjMyLWI3NDUtYmNmNjcyMmY4MWYyIiwiaWF0IjoxNzM3ODk0NTYzLCJleHAiOjE3NDA0ODY1NjN9.EnQNpCY0UBWRblDb9DXfN5q-VDTQHOt8_xrHLihQyfk',
    },
  },
  IsFriend: {
    Description: {
      description: 'Пользователь добавлен в друзья',
      example: true,
    },
  },
  Users: {
    Description: {
      description: 'Список пользователей',
    },
  },
} as const;
