import { HttpStatus } from '@nestjs/common';
import { TrainingWithPaginationRdo } from '../../rdo/training/training-with-pagination.rdo';
import { TrainingWithCoachRdo } from '../../rdo/training/training-with-coach.rdo';

export const TrainingResponse = {
  TrainingFound: {
    type: TrainingWithCoachRdo,
    status: HttpStatus.OK,
    description: 'Карточка тренировки получена',
  },
  TrainingNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Тренировка не найдена',
  },
  Trainings: {
    type: TrainingWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список тренировок получен',
  },
} as const;
