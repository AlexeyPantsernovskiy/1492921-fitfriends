import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ApiRoute, AppRoute, LimitTrainingCard } from '@frontend/src/const';

import {
  TrainingWithPaginationRdo,
  TrainingQuery,
  TrainingWithCoachRdo,
  TrainingRdo,
} from '@project/shared';
import { ApiExtra } from '@frontend/src/types/types';
import { queryToString } from '@frontend/src/utils';

const TrainingAction = {
  GetAllTrainings: 'trainings/all',
  GetTrainings: 'trainings/get',
  SpecialForYou: 'trainings/special-for-you',
  GetTraining: 'training/get',
  TrainingCreate: 'training/create',
  TrainingUpdate: 'training/update',
};

export const getAllTrainings = createAsyncThunk<
  TrainingWithPaginationRdo,
  void,
  { extra: ApiExtra }
>(TrainingAction.GetAllTrainings, async (_arg, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingWithPaginationRdo>(ApiRoute.Trainings);
  return data;
});

export const getTrainings = createAsyncThunk<
  TrainingWithPaginationRdo,
  TrainingQuery,
  { extra: ApiExtra }
>(TrainingAction.GetTrainings, async (query, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingWithPaginationRdo>(
    `${ApiRoute.Trainings}?${queryToString(query)}`
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

export const createTraining = createAsyncThunk<
  TrainingRdo,
  FormData,
  { extra: ApiExtra }
>(TrainingAction.TrainingCreate, async (training, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<TrainingRdo>(ApiRoute.Trainings, training);
  return data;
});

export const updateTraining = createAsyncThunk<
  TrainingRdo,
  { trainingId: string; formData: FormData },
  { extra: ApiExtra }
>(
  TrainingAction.TrainingUpdate,
  async ({ trainingId, formData }, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<TrainingRdo>(
      `${ApiRoute.Trainings}/${trainingId}`,
      formData
    );
    return data;
  }
);
