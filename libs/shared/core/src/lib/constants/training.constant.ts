import { SortDirection } from '../types/sort-direction.enum';
import { SortType } from '../types/sort-type.enum';
import { FileLoading } from './file-vault.constant';

export const TrainingSortDefault = {
  Direction: SortDirection.Desc,
  Type: SortType.Date,
} as const;

export const TrainingErrorMessage = {
  ChangeCoach: 'Запрещено менять тренера, создавшего тренировку',
} as const;

export const TrainingParamWeight = {
  Specialization: 0.4,
  Sex: 0.3,
  Level: 0.2,
  Duration: 0.1,
} as const;

export const TrainingLimit = {
  Name: {
    MinLength: 1,
    MaxLength: 15,
  },
  Price: {
    Min: 0,
  },
  VideoFile: {
    FileExtRegExp: FileLoading.Video.FileExtRegExp,
  },
  Description: {
    MinLength: 10,
    MaxLength: 140,
  },
  Calories: {
    Min: 1000,
    Max: 5000,
  },
  Rating: {
    Min: 0,
    Max: 5,
  },
  Quantity: {
    Min: 1,
    Max: 50,
  },
};
