import { TrainingProperty } from './training-property';

export const TrainingParam = {
  TrainingId: {
    name: 'trainingId',
    type: Number,
    schema: TrainingProperty.Id,
  },
} as const;
