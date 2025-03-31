import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { LimitTrainingCard, StoreSlice } from '@frontend/src/const';
import { TrainingProcess } from '@frontend/src/types/state';
import {
  TrainingRdo,
  TrainingWithCoachRdo,
  TrainingWithPaginationRdo,
} from '@project/shared';

import { getTraining, getTrainings, getSpecialForYou } from './training-action';

const initialState: TrainingProcess = {
  specialForYou: [],
  isSpecialForYouLoading: false,
  trainings: null,
  isTrainingsLoading: false,
  training: null,
  isTrainingLoading: false,
  // trainingComment: null,
  // isTrainingCommentLoading: false,
  // isSuccessAddTrainingComment: false,
};

const endLoadingSpecialForYou = (
  state: TrainingProcess,
  action: PayloadAction<TrainingRdo[]>
) => {
  state.specialForYou = action.payload;
  state.isSpecialForYouLoading = false;
};

const startLoadingSpecialForYou = (state: TrainingProcess) => {
  state.isSpecialForYouLoading = true;
};

const errorLoadingSpecialForYou = (state: TrainingProcess) => {
  state.isSpecialForYouLoading = false;
};

const endLoadingTrainings = (
  state: TrainingProcess,
  action: PayloadAction<TrainingWithPaginationRdo>
) => {
  state.trainings = action.payload;
  state.isTrainingsLoading = false;
};

const startLoadingTrainings = (state: TrainingProcess) => {
  state.isTrainingsLoading = true;
};

const errorLoadingTrainings = (state: TrainingProcess) => {
  state.isTrainingsLoading = false;
};

const endLoadingTraining = (
  state: TrainingProcess,
  action: PayloadAction<TrainingWithCoachRdo>
) => {
  state.training = action.payload;
  state.isTrainingLoading = false;
};

const startLoadingTraining = (state: TrainingProcess) => {
  state.isTrainingLoading = true;
};

const errorLoadingTraining = (state: TrainingProcess) => {
  state.isTrainingLoading = false;
};

export const trainingProcess = createSlice({
  name: StoreSlice.TrainingProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSpecialForYou.pending, startLoadingSpecialForYou)
      .addCase(getSpecialForYou.fulfilled, endLoadingSpecialForYou)
      .addCase(getSpecialForYou.rejected, errorLoadingSpecialForYou)

      .addCase(getTrainings.pending, startLoadingTrainings)
      .addCase(getTrainings.fulfilled, endLoadingTrainings)
      .addCase(getTrainings.rejected, errorLoadingTrainings)

      .addCase(getTraining.pending, startLoadingTraining)
      .addCase(getTraining.fulfilled, endLoadingTraining)
      .addCase(getTraining.rejected, errorLoadingTraining);
  },
  selectors: {
    isSpecialForYouLoading: (state) => state.isSpecialForYouLoading,
    specialForYou: (state) => state.specialForYou,
    isTrainingsLoading: (state) => state.isTrainingsLoading,
    trainings: (state) => state.trainings,
    isTrainingLoading: (state) => state.isTrainingLoading,
    training: (state) => state.training,
  },
});

export const trainingSelectors = {
  ...trainingProcess.selectors,
  specialOffers: createSelector(
    trainingProcess.selectors.trainings,
    (trainings) =>
      !trainings || trainings.entities.length === 0
        ? null
        : trainings.entities
            .filter((training) => training.isSpecialOffer)
            .slice(0, LimitTrainingCard.SliderSpecialOffers - 1)
  ),
  popularTrainings: createSelector(
    trainingProcess.selectors.trainings,
    (trainings) => {
      if (!trainings || trainings.entities.length === 0) {
        return null;
      }
      // Находим максимальный рейтинг среди всех тренировок
      const maxRating = Math.max(
        ...trainings.entities.map((training) => training.rating || 0)
      );
      // Фильтруем тренировки с максимальным рейтингом
      return trainings.entities.filter(
        (training) => training.rating === maxRating
      );
    }
  ),
  maxPrice: createSelector(trainingProcess.selectors.trainings, (trainings) =>
    !trainings || trainings.entities.length === 0
      ? 0
      : Math.max(...trainings.entities.map((training) => training.price))
  ),
};
