import { HttpStatus } from '@nestjs/common';

import { TrainingOrderWithPaginationRdo } from '../../rdo/training/training-order-with-pagination.rdo';
import { TrainingOrderRdo } from '../../rdo/training/training-order.rdo';
import { TrainingOrderTotalWithPaginationRdo } from '../../rdo/training/training-order-total-with-pagination.rdo';

export const TrainingOrderResponse = {
  OrderCreated: {
    type: TrainingOrderRdo,
    status: HttpStatus.CREATED,
    description: 'Тренировка куплена',
  },
  Orders: {
    type: TrainingOrderWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список купленных тренировок получен',
  },
  OrdersTotal: {
    type: TrainingOrderTotalWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список купленных тренировок с итогами получен',
  },
  OrderUpdating: {
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Состояние заказа (покупки) изменено',
  },
  ForbiddenCreate: {
    status: HttpStatus.FORBIDDEN,
    description: 'Тренер не может покупать тренировки',
  },
  ForbiddenUpdate: {
    status: HttpStatus.FORBIDDEN,
    description:
      'Изменять статус купленной тренировки может только спортсмен ее купивший',
  },
} as const;
