import { LEVELS, SPECIALIZATIONS, DURATIONS } from '../../constants/data';
import { UserLimit } from '../../constants/user.constant';

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
      ...UserLimit.Specialization,
      Message: `Специализация должна быть набором из не более ${UserLimit.Specialization.MaxCount} значений (${SPECIALIZATIONS.join(', ')})`,
    },
  },
  Duration: {
    Description: {
      description: 'Время, выделяемое на тренировку',
      enum: DURATIONS,
      example: DURATIONS[1],
    },
    Validate: {
      Message: `Время, выделяемое на тренировку должно быть одним из значений (${DURATIONS.join(', ')})`,
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
      ...UserLimit.CaloriesLose,
      Message: `Количество калорий для сброса должно быть от ${UserLimit.CaloriesLose.Min} до ${UserLimit.CaloriesLose.Max}`,
    },
  },
  CaloriesWaste: {
    Description: {
      description: 'Количество калорий для траты в день',
      example: 2000,
    },
    Validate: {
      ...UserLimit.CaloriesWaste,
      Message: `Количество калорий для траты в день должно быть от ${UserLimit.CaloriesWaste.Min} до ${UserLimit.CaloriesWaste.Max}`,
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
      Message:
        'Готовность к тренировке должно быть обязательно заполнено (true или false)',
    },
  },
  IamReadyToTrain: {
    Description: {
      description: 'Готовность проводить индивидуальные тренировки',
      type: Boolean,
      example: true,
      default: false,
      required: true,
    },
    Validate: {
      Message:
        'Признак готовности тренировать должен быть обязательно заполнен (true или false)',
    },
  },
  Certificates: {
    Description: {
      description: 'Дипломы и сертификаты тренера',
      isArray: true,
      example: ['documents/certificate-1.pdf', 'documents/certificate-2.pdf'],
    },
    Validate: {
      ...UserLimit.Certificates,
      Message: `У тренера должны быть дипломы или сертификаты (не менее: ${UserLimit.Certificates.MinCount})`,
    },
  },
  IndexCertificate: {
    Description: {
      description: 'Порядковый номер сертификата',
      example: 1,
      required: true,
    },
  },
  Certificate: {
    Description: {
      description: 'Путь к файлу с сертификатом',
      example: 'documents/certificate.pdf',
      required: true,
    },
  },
  CertificateFile: {
    Description: {
      type: 'string',
      description: 'Файл с сертификатом тренера',
      example: 'documents/certificate.pdf',
      format: 'binary',
      required: true,
    },
    Validate: {
      ...UserLimit.CertificateFile,
      Message: 'Разрешено загружать фото в формате .pdf',
    },
  },
  Achievements: {
    Description: {
      description: 'Текст с описанием заслуг тренера',
      required: false,
      example: 'Автор курса "Фитнес-мама", который прошли более 150 женщин',
    },
    Validate: {
      ...UserLimit.Achievements,
      Message: `Длина текста с описанием заслуг тренера должна быть от ${UserLimit.Achievements.MinLength} до ${UserLimit.Achievements.MaxLength} символов`,
    },
  },
} as const;
