import { getSchemaPath } from '@nestjs/swagger';
import { DURATIONS, LEVELS, SPECIALIZATIONS } from '../../constants/data';
import {
  FillCoachQuestionnaireDto,
  FillUserQuestionnaireDto,
} from '../../dto/user/fill-questionnaire.dto';

export const QuestionnaireUserBody = {
  fill: {
    description: 'Данные опросника (отличаются для спортсмена и тренера)',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(FillUserQuestionnaireDto) },
        { $ref: getSchemaPath(FillCoachQuestionnaireDto) },
      ],
    },
    examples: {
      sportsman: {
        summary: 'Для спортсмена',
        value: {
          specialization: [SPECIALIZATIONS[1], SPECIALIZATIONS[3]],
          duration: DURATIONS[1],
          level: LEVELS[1],
          caloriesLose: 3000,
          caloriesWaste: 2000,
          isReadyToTrain: true,
        },
      },
      coach: {
        summary: 'Для тренера',
        value: {
          specialization: [SPECIALIZATIONS[2], SPECIALIZATIONS[4]],
          level: LEVELS[2],
          certificate: './uploads/default/certificate-3.pdf',
          achievements:
            'Подготовил 12 спортсменов к соревнованиям по фитнес-бикини',
          isReadyToTrain: false,
        },
      },
    },
  },
} as const;
