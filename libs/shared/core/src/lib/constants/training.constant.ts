import { SortDirection } from '../types/sort-direction.enum';
import { SortType } from '../types/sort-type.enum';


export const NO_UPDATE_PHOTO = '~~no-update-file~~';

export const TrainingSortDefault = {
  Direction: SortDirection.Desc,
  Type: SortType.Date,
} as const;

export const TrainingParamWeight = {
  Specialization: 0.4,
  Sex: 0.3,
  Level: 0.2,
  Duration: 0.1,
} as const;
