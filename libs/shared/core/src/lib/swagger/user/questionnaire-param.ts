import { QuestionnaireUserProperty } from './questionnaire-user-property';

export const QuestionnaireParam = {
  IndexCertificate: {
    name: 'indexCertificate',
    type: Number,
    schema: QuestionnaireUserProperty.IndexCertificate,
  },
} as const;
