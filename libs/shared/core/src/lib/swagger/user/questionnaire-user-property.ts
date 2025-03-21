import { LEVELS, SPECIALIZATIONS, TIMES } from '../../constants/data';

export const QuestionnaireUserProperty = {
  UserId: {
    Description: {
      description: 'Идентификатор пользователя (ID)',
      example: '67947fc34444fac62a805fb8',
    },
  },
  Specialization: {
    Description: {
      description: 'Специализация (тип) тренировок',
      enum: SPECIALIZATIONS,
      isArray: true,
      example: [SPECIALIZATIONS[1], SPECIALIZATIONS[3]],
    },
    Validate: {
      Message: `Специализация должна быть набором из значений (${SPECIALIZATIONS.join(', ')})`,
    },
  },
  Time: {
    Description: {
      description: 'Время, выделяемое на тренировку',
      enum: TIMES,
      example: TIMES[1],
    },
    Validate: {
      Message: `Время, выделяемое на тренировку должно быть одним из значений (${TIMES.join(', ')})`,
    },
  },
  Level: {
    Description: {
      description: 'Уровень подготовки',
      enum: LEVELS,
      example: LEVELS[1],
    },
    Validate: {
      Message: `Уровень подготовки должен быть одним из значений (${LEVELS.join(', ')})`,
    },
  },
  CaloriesLose: {
    Description: {
      description: 'Количество калорий для сброса',
      example: 3000,
    },
    Validate: {
      Min: 1000,
      Max: 5000,
      Message: 'Количество калорий для сброса должно быть от 1000 до 5000',
    },
  },
  CaloriesWaste: {
    Description: {
      description: 'Количество калорий для траты в день',
      example: 2000,
    },
    Validate: {
      Min: 1000,
      Max: 5000,
      Message:
        'Количество калорий для траты в день должно быть от 1000 до 5000',
    },
  },
  IsReadyToTrain: {
    Description: {
      description: 'Готовность к тренировке',
      type: Boolean,
      example: true,
      default: false,
      required: true,
    },
    Validate: {
      Message: `Готовность к тренировке должно быть обязательно заполнено (true или false)`,
    },
  },
} as const;
