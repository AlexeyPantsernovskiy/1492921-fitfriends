import { TrainingLimit } from '../../constants/training.constant';
import { OrderAction } from '../../types/order-action.enum';
import { OrderType } from '../../types/order-type.enum';
import { PaymentType } from '../../types/payment-type.enum';

export const TrainingOrderProperty = {
  Id: {
    Description: {
      description: 'Уникальный идентификатор заказа (покупки) (ID)',
      example: '123',
    },
  },
  Type: {
    Description: {
      description: 'Вид покупки',
      example: OrderType.Promo,
      enum: OrderType,
      required: true,
    },
    Validate: {
      Message: `Вид покупки должен быть одним из значений (${Object.values(OrderType).join(', ')})`,
    },
  },
  Quantity: {
    Description: {
      description: 'Количество приобретаемых тренировок',
      example: '1',
      required: true,
      minimum: TrainingLimit.Quantity.Min,
      maximum: TrainingLimit.Quantity.Max,
    },
    Validate: {
      ...TrainingLimit.Quantity,
      Message: `Количество приобретаемых тренировок должно быть от ${TrainingLimit.Quantity.Min} до ${TrainingLimit.Quantity.Max}`,
    },
  },
  Amount: {
    Description: {
      description: 'Стоимость заказа',
      example: '1076',
    },
  },
  PaymentType: {
    Description: {
      description: 'Вариант оплаты заказа',
      enum: PaymentType,
      example: PaymentType.Visa,
    },
    Validate: {
      Message: `Вариант оплаты заказа должен быть одним из значений (${Object.values(PaymentType).join(', ')})`,
    },
  },
  OnlyActive: {
    Description: {
      description: 'Только активные',
      example: false,
      default: false,
      required: false,
    },
  },
  IsStarted: {
    Description: {
      description: 'Тренировка активирована',
      example: true,
    },
  },
  DoneCount: {
    Description: {
      description: 'Количество завершенных тренировок',
      example: 1,
    },
  },
  IsDone: {
    Description: {
      description: 'Тренировка завершена',
      example: false,
    },
  },
  CreateDate: {
    Description: {
      description: 'Дата покупки тренировки',
      example: new Date().toISOString().split('T')[0],
    },
  },
  Training: {
    Description: {
      description: 'Информация о купленной тренировке',
      example: '{trainingObject}',
    },
  },
  Orders: {
    Description: {
      description: 'Список купленных тренировок',
      example: '{trainingObject}',
      isArray: true,
    },
  },
  Action: {
    Description: {
      description: 'Действие с купленной тренировкой',
      enum: OrderAction,
      example: OrderAction[0],
      required: true,
    },
    Validate: {
      Message: `Действие с купленной тренировкой должно быть одним из значений (${Object.values(OrderAction).join(', ')})`,
    },
  },
  QuantityTotal: {
    Description: {
      description: 'Куплено тренировок',
      example: '10',
    },
  },
  AmountTotal: {
    Description: {
      description: 'Общая сумма',
      example: '10050',
    },
  },
} as const;
