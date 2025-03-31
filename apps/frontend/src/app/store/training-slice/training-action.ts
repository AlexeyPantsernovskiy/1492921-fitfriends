import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ApiRoute, LimitTrainingCard } from '@frontend/src/const';
import {
  TrainingWithPaginationRdo,
  TrainingQuery,
  TrainingWithCoachRdo,
  TrainingRdo,
} from '@project/shared';
import { ApiExtra, AppRoute } from '@frontend/src/types/types';

const TrainingAction = {
  GetTrainings: 'trainings/get',
  SpecialForYou: 'trainings/special-for-you',
  GetTraining: 'training/get',
};

export const getTrainings = createAsyncThunk<
  TrainingWithPaginationRdo,
  TrainingQuery | null,
  { extra: ApiExtra }
>(TrainingAction.GetTrainings, async (query, { extra }) => {
  const { api } = extra;

  const queryStrings: string[] = [];
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            queryStrings.push(`${key}=${String(item)}`);
          });
        } else {
          queryStrings.push(`${key}=${String(value)}`);
        }
      }
    });
  }

  const { data } = await api.get<TrainingWithPaginationRdo>(
    `${ApiRoute.Trainings}?${queryStrings.join('&')}`
  );

  return data;
});

export const getSpecialForYou = createAsyncThunk<
  TrainingRdo[],
  undefined,
  { extra: ApiExtra }
>(TrainingAction.SpecialForYou, async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingRdo[]>(
    `${ApiRoute.SpecialForYou}?limit=${LimitTrainingCard.SpecialForYou}`
  );
  return data;
});

// export const getSpecialTrainings = createAsyncThunk<
//   TrainingWithPaginationRdo,
//   undefined,
//   { extra: ApiExtra }
// >(TrainingAction.GetSpecialTrainings, async (_arg, { extra }) => {
//   const { api } = extra;
//   const { data } = await api.get<TrainingWithPaginationRdo>(
//     `${ApiRoute.Trainings}?page=1&sortBy=${SortType.Date}&sortDirection=${SortDirection.Desc}&limit=${SPECIAL_FOR_YOU_CARD_LIMIT}`
//   );

//   return data;
// });

// export const getPopularTrainings = createAsyncThunk<
//   TrainingWithPaginationRdo,
//   undefined,
//   { extra: ApiExtra }
// >(TrainingAction.GetPopularTrainings, async (_arg, { extra }) => {
//   const { api } = extra;
//   const { data } = await api.get<TrainingWithPaginationRdo>(
//     `${ApiRoute.Trainings}?page=1&sortBy=${SortType.Rating}&sortDirection=${SortDirection.Desc}`
//   );

//   return data;
// });

export const getTraining = createAsyncThunk<
  TrainingWithCoachRdo,
  TrainingWithCoachRdo['id'],
  { extra: ApiExtra }
>(TrainingAction.GetTraining, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<TrainingWithCoachRdo>(
      `${ApiRoute.Trainings}/${id}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});
