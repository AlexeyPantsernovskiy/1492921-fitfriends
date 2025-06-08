import { AxiosInstance } from 'axios';
import { History } from 'history';

import { AppRoute, ToggleRange } from '@frontend/const';
import { FileLoadingInput } from './component';
import { RequestTrain } from '@project/shared';

export type RouteApp = (typeof AppRoute)[keyof typeof AppRoute];

export type ApiExtra = {
  api: AxiosInstance;
  history: History;
};

export type RequestTrainParam = {
  userId: string;
  action: RequestTrain;
};

export type RangeValue = { min: number; max: number };

export type ToggleMinMax = (typeof ToggleRange)[keyof typeof ToggleRange];

export type FileTypeLoading =
  (typeof FileLoadingInput)[keyof typeof FileLoadingInput];
