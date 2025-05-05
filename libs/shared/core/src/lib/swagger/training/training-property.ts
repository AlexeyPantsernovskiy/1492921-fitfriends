import { DURATIONS, LEVELS, SEX, SPECIALIZATIONS } from '../../constants/data';
import { TrainingLimit } from '../../constants/training.constant';
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
      ...TrainingLimit.Name,
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
    Validate: {
      Message: `Уровень пользователя, на которого рассчитана тренировка должна быть одним из значений (${LEVELS.join(', ')})`,
    },
  },
  Specialization: {
    Description: {
      description: 'Тип тренировки',
      enum: SPECIALIZATIONS,
      example: SPECIALIZATIONS[1],
    },
    Validate: {
      Message: `Специализация должна быть одним из значений (${SPECIALIZATIONS.join(', ')})`,
    },
  },
  Duration: {
    Description: {
      description: 'Длительность тренировки',
      enum: DURATIONS,
      example: DURATIONS[0],
    },
    Validate: {
      Message: `Длительность тренировки должна быть одним из значений (${DURATIONS.join(', ')})`,
    },
  },
  Price: {
    Description: {
      description: `Стоимость тренировки в рублях`,
      minimum: TrainingLimit.Price.Min,
      example: '700',
    },
    Validate: {
      ...TrainingLimit.Price,
      Message: `Стоимость тренировки должна быть не менее ${TrainingLimit.Price.Min}`,
    },
  },
  Calories: {
    Description: {
      description: 'Количество калорий',
      minimum: TrainingLimit.Calories.Min,
      maximum: TrainingLimit.Calories.Max,
      example: 1000,
    },
    Validate: {
      ...TrainingLimit.Calories,
      Message: `Количество калорий должно быть от ${TrainingLimit.Calories.Min} до ${TrainingLimit.Calories.Max}`,
    },
  },
  Description: {
    Description: {
      description: 'Описание тренировки',
      example:
        'Интенсивная утренняя пробежка для заряда энергией на весь день.',
    },
    Validate: {
      ...TrainingLimit.Description,
      Message: `Описание тренировки должно быть от ${TrainingLimit.Description.MinLength} до ${TrainingLimit.Description.MaxLength} символов`,
    },
  },
  Sex: {
    Description: {
      description: 'Пол пользователя для которого предназначена тренировка',
      enum: SEX,
      example: SEX[0],
    },
    Validate: {
      Message: `Пол пользователя для которого предназначена тренировка должен быть одним из значений (${SEX.join(', ')})`,
    },
  },
  Video: {
    Description: {
      description:
        'Видео файл с демонстрацией тренировки в формате mov/avi/mp4',
      example: 'video.mp4',
    },
  },
  VideoFile: {
    Description: {
      type: 'string',
      description:
        'Видео файл с демонстрацией тренировки в формате mov/avi/mp4',
      example: '/uploads/default/video.mp4',
      format: 'binary',
    },
    Validate: {
      ...TrainingLimit.VideoFile,
      Message: 'Разрешено загружать видео в формате mov/avi/mp4',
    },
  },
  Rating: {
    Description: {
      description: 'Рейтинг тренировки',
      example: '4.5',
      minimum: TrainingLimit.Rating.Min,
      maximum: TrainingLimit.Rating.Max,
    },
    Validate: {
      ...TrainingLimit.Rating,
      Message: `Рейтинг должен быть в диапазоне от ${TrainingLimit.Rating.Min} до ${TrainingLimit.Rating.Max}`,
    },
  },
  CoachId: {
    Description: {
      description: 'Идентификатор тренера, создателя тренировки',
      example: '67e1672733fbb513353d7f18',
    },
    Validate: {
      Message: 'Идентификатор тренера должен быть корректным MongoID',
    },
  },
  Coach: {
    Description: {
      description: 'Информация о тренере',
      example: {
        name: 'Иван',
        avatar: 'http://localhost:5000/static/avatar-1.jpg',
      },
    },
  },
  IsSpecialOffer: {
    Description: {
      description:
        'Флаг определяет участие тренировки (участвует, не участвует) в качестве специального предложения',
      example: 'true',
    },
  },
  CreateDate: {
    Description: {
      description: 'Дата создания тренировки',
      example: new Date().toISOString().split('T')[0],
    },
  },
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
      minimum: TrainingLimit.Price.Min,
      example: 200,
      required: false,
    },
    Validate: {
      ...TrainingLimit.Price,
      Message: `Минимальная цена тренировки должна быть не менее ${TrainingLimit.Price.Min}`,
    },
  },
  MaxPrice: {
    Description: {
      description: 'Максимальная цена тренировки',
      minimum: TrainingLimit.Price.Min,
      example: 1300,
      required: false,
    },
    Validate: {
      ...TrainingLimit.Price,
      Message: `Максимальная цена тренировки должна быть не менее ${TrainingLimit.Price.Min}`,
    },
  },
  MinCalories: {
    Description: {
      description: 'Минимальное количество калорий',
      minimum: TrainingLimit.Calories.Min,
      maximum: TrainingLimit.Calories.Max,
      example: 2000,
      required: false,
    },
    Validate: {
      ...TrainingLimit.Calories,
      Message: `Минимальное количество калорий должно быть в диапазоне от ${TrainingLimit.Calories.Min} до ${TrainingLimit.Calories.Max}`,
    },
  },
  MaxCalories: {
    Description: {
      description: 'Максимальное количество калорий',
      minimum: TrainingLimit.Calories.Min,
      maximum: TrainingLimit.Calories.Max,
      example: 4000,
      required: false,
    },
    Validate: {
      ...TrainingLimit.Calories,
      Message: `Максимальное количество калорий должно быть в диапазоне от ${TrainingLimit.Calories.Min} до ${TrainingLimit.Calories.Max}`,
    },
  },
  MinRating: {
    Description: {
      description: 'Минимальный рейтинг',
      minimum: TrainingLimit.Rating.Min,
      maximum: TrainingLimit.Rating.Max,
      example: 3,
      required: false,
    },
    Validate: {
      ...TrainingLimit.Rating,
      Message: `Минимальный рейтинг должен быть в диапазоне от ${TrainingLimit.Rating.Min} до ${TrainingLimit.Rating.Max}`,
    },
  },
  MaxRating: {
    Description: {
      description: 'Максимальный рейтинг',
      minimum: TrainingLimit.Rating.Min,
      maximum: TrainingLimit.Rating.Max,
      example: 5,
      required: false,
    },
    Validate: {
      ...TrainingLimit.Rating,
      Message: `Максимальный рейтинг должен быть в диапазоне от ${TrainingLimit.Rating.Min} до ${TrainingLimit.Rating.Max}`,
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
  Durations: {
    Description: {
      description: 'Возможные длительности тренировки',
      enum: DURATIONS,
      isArray: true,
      example: [DURATIONS[1], DURATIONS[3]],
      required: false,
    },
  },
  MaxAllPrice: {
    Description: {
      description: 'Максимальная цена из всех тренировок',
      example: 2200,
    },
  },
} as const;
