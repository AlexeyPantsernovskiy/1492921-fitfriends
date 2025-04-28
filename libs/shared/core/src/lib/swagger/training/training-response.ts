import { HttpStatus } from '@nestjs/common';
import { TrainingWithPaginationRdo } from '../../rdo/training/training-with-pagination.rdo';
import { TrainingWithCoachRdo } from '../../rdo/training/training-with-coach.rdo';
import { TrainingRdo } from '../../rdo/training/training.rdo';

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
  ForbiddenCreate: {
    status: HttpStatus.FORBIDDEN,
    description: 'Создавать тренировки может только тренер',
  },
  ForbiddenUpdate: {
    status: HttpStatus.FORBIDDEN,
    description: 'Корректировать тренировку может только тренер ее создавший',
  },
  Trainings: {
    type: TrainingWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список тренировок получен',
  },
  TrainingCreated: {
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'Новая тренировка создана',
  },
  TrainingUpdating: {
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Тренировка изменена',
  },
} as const;
