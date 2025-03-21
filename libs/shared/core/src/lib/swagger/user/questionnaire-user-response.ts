import { HttpStatus } from '@nestjs/common';
import { QuestionnaireUserRdo } from '../../rdo/user/questionnaire-user.rdo';

export const QuestionnaireUserResponse = {
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  },
  Created: {
    type: QuestionnaireUserRdo,
    status: HttpStatus.CREATED,
    description: 'Опросник был успешно сохранен',
  },
  Get: {
    type: QuestionnaireUserRdo,
    status: HttpStatus.OK,
    description: 'Опросник получен',
  },
} as const;
