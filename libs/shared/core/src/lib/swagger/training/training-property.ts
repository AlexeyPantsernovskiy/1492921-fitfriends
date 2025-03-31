import { DURATIONS, LEVELS, SEX, SPECIALIZATIONS } from '../../constants/data';
import { SortDirection } from '../../types/sort-direction.enum';
import { SortType } from '../../types/sort-type.enum';

export const TrainingProperty = {
  Id: {
    Description: {
      description: 'Уникальный идентификатор тренировки (ID)',
      example: '123',
    },
  },
  Name: {
    Description: {
      description: 'Наименование тренировки',
      example: 'Утренний бег',
    },
    Validate: {
      MinLength: 1,
      MaxLength: 15,
      Message: 'Наименование тренировки (name) должно быть от 1 до 15 символов',
    },
  },
  Image: {
    Description: {
      description: 'Фоновая картинка для карточки тренировки в формате jpg/png',
      example: 'image01.png',
    },
  },
  Level: {
    Description: {
      description: 'Уровень пользователя, на которого рассчитана тренировка',
      enum: LEVELS,
      example: LEVELS[1],
    },
  },
  Specialization: {
    Description: {
      description: 'Тип тренировки',
      enum: SPECIALIZATIONS,
      example: SPECIALIZATIONS[1],
    },
  },
  Duration: {
    Description: {
      description: 'Длительность тренировки',
      enum: DURATIONS,
      example: DURATIONS[0],
    },
  },
  Price: {
    Description: {
      description: 'Стоимость тренировки в рублях',
      minimum: 0,
      example: '700',
    },
    Validate: {
      min: 0,
      Message: 'Стоимость тренировке не может быть отрицательной',
    },
  },
  Calories: {
    Description: {
      description: 'Количество калорий',
      minimum: 1000,
      maximum: 5000,
      example: '1000',
    },
    Validate: {
      min: 1000,
      max: 5000,
      Message: 'Количество калорий должно быть от 1000 до 5000 символов',
    },
  },
  Description: {
    Description: {
      description: 'Описание тренировки',
      example:
        'Интенсивная утренняя пробежка для заряда энергией на весь день.',
    },
    Validate: {
      MinLength: 10,
      MaxLength: 140,
      Message: 'Описание тренировки должно быть от 10 до 140 символов',
    },
  },
  Sex: {
    Description: {
      description: 'Пол пользователя для которого предназначена тренировка',
      enum: SEX,
      example: SEX[0],
    },
  },
  Video: {
    Description: {
      description:
        'Видео файл с демонстрацией тренировки в формате mov/avi/mp4',
      example: 'video.mp4',
    },
  },
  Rating: {
    Description: {
      description: 'Рейтинг тренировки',
      example: '4.5',
    },
  },
  CoachId: {
    Description: {
      description: 'Идентификатор тренера, создателя тренировки',
      example: '67e1672733fbb513353d7f18',
    },
  },
  Coach: {
    Description: {
      description: 'Информация о тренере',
    },
  },
  IsSpecialOffer: {
    Description: {
      description:
        'Флаг определяет участие тренировки (участвует, не участвует) в качестве специального предложения',
      example: 'true',
    },
  },
  // CreateDate: {
  //   Description: {
  //     description: 'Дата создания тренировки',
  //     example: new Date().toISOString().split('T')[0],
  //   },
  // },
  // Coach: {
  //   Description: {
  //     description: 'Тренер, создатель тренировки',
  //     type: UserRdo,
  //     example: `user object`,
  //   },
  // },
  TrainingCatalog: {
    Description: {
      description: 'Каталог тренировок',
      example: '[{trainingObject1}, {trainingObject2}]',
      isArray: true,
    },
  },
  SortDirection: {
    Description: {
      description: 'Направление сортировки',
      enum: SortDirection,
      enumName: 'SortDirection',
      example: SortDirection.Desc,
      required: false,
    },
  },
  SortType: {
    Description: {
      description: 'Вариант сортировки',
      enum: SortType,
      enumName: 'SortType',
      example: SortType.Price,
      required: false,
    },
  },
  MinPrice: {
    Description: {
      description: 'Минимальная цена тренировки',
      minimum: 0,
      example: 200,
      required: false,
    },
    Validate: {
      Min: 0,
      Message: 'Минимальная цена тренировки не может быть отрицательной',
    },
  },
  MaxPrice: {
    Description: {
      description: 'Максимальная цена тренировки',
      minimum: 0,
      example: 1300,
      required: false,
    },
    Validate: {
      Min: 0,
      Message: 'Максимальная цена тренировки не может быть отрицательной',
    },
  },
  MinCalories: {
    Description: {
      description: 'Минимальное количество калорий',
      minimum: 1000,
      maximum: 5000,
      example: 2000,
      required: false,
    },
    Validate: {
      Min: 1000,
      Max: 5000,
      Message:
        'Минимальное количество калорий должно быть в диапазоне от 1000 до 5000',
    },
  },
  MaxCalories: {
    Description: {
      description: 'Максимальное количество калорий',
      minimum: 1000,
      maximum: 5000,
      example: 4000,
      required: false,
    },
    Validate: {
      Min: 1000,
      Max: 5000,
      Message:
        'Минимальное количество калорий должно быть в диапазоне от 1000 до 5000',
    },
  },
  MinRating: {
    Description: {
      description: 'Минимальный рейтинг',
      minimum: 0,
      maximum: 5,
      example: 3,
      required: false,
    },
    Validate: {
      Min: 0,
      Max: 5,
      Message: 'Минимальный рейтинг должен быть в диапазоне от 0 до 5',
    },
  },
  MaxRating: {
    Description: {
      description: 'Максимальный рейтинг',
      minimum: 0,
      maximum: 5,
      example: 5,
      required: false,
    },
    Validate: {
      Min: 0,
      Max: 5,
      Message: 'Максимальный рейтинг должен быть в диапазоне от 0 до 5',
    },
  },
  Specializations: {
    Description: {
      description: 'Типы тренировок',
      enum: SPECIALIZATIONS,
      isArray: true,
      example: [SPECIALIZATIONS[1], SPECIALIZATIONS[3]],
      required: false,
    },
  },
} as const;
