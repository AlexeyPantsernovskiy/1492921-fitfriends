import { HttpStatus } from '@nestjs/common';

import { QuestionnaireRdo } from '../../rdo/user.rdo';

export const QuestionnaireResponse = {
  UserNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  },
  Created: {
    type: QuestionnaireRdo,
    status: HttpStatus.CREATED,
    description: 'Опросник был успешно сохранен',
  },
  Get: {
    type: QuestionnaireRdo,
    status: HttpStatus.OK,
    description: 'Опросник получен',
  },
} as const;
