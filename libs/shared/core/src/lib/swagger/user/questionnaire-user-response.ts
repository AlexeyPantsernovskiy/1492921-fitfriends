import { HttpStatus } from '@nestjs/common';
import {
  QuestionnaireCoachRdo,
  QuestionnaireUserRdo,
} from '../../rdo/user/questionnaire.rdo';

export const QuestionnaireUserResponse = {
  Created: {
    type: QuestionnaireUserRdo,
    status: HttpStatus.CREATED,
    description: 'Опросник был успешно сохранен',
  },
  Found: {
    type: QuestionnaireUserRdo,
    status: HttpStatus.OK,
    description: 'Опросник получен',
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'Опросник не найден',
  },
  // GetCertificates: {
  //   status: HttpStatus.OK,
  //   description: 'Сертификаты и дипломы тренера получены',
  // },
  UpdateCertificates: {
    type: QuestionnaireCoachRdo,
    status: HttpStatus.OK,
    description: 'Сертификаты и дипломы тренера обновлены',
  },
  ForbiddenUpdateCertificates: {
    status: HttpStatus.FORBIDDEN,
    description: 'Обновлять свои сертификаты и дипломы может только тренер',
  },
} as const;
