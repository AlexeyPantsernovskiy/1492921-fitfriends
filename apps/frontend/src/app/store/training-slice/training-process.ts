import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { Limits, StoreSlice } from '@frontend/src/const';
import { TrainingProcess } from '@frontend/src/types/state';
import {
  TrainingRdo,
  TrainingWithCoachRdo,
  TrainingWithPaginationRdo,
} from '@project/shared';

import {
  getTraining,
  getTrainings,
  getSpecialForYou,
  getAllTrainings,
  createTraining,
  updateTraining,
} from './training-action';

const initialState: TrainingProcess = {
  trainings: null,
  isTrainingsLoading: false,
  trainingCatalog: null,
  isTrainingCatalogLoading: false,
  specialForYou: [],
  isSpecialForYouLoading: false,
  training: null,
  isTrainingLoading: false,
  isTrainingSaving: false,
  // trainingComment: null,
  // isTrainingCommentLoading: false,
  // isSuccessAddTrainingComment: false,
};

const endLoadingAllTrainings = (
  state: TrainingProcess,
  action: PayloadAction<TrainingWithPaginationRdo>
) => {
  state.trainings = action.payload;
  state.isTrainingsLoading = false;
};

const startLoadingAllTrainings = (state: TrainingProcess) => {
  state.isTrainingsLoading = true;
};

const errorLoadingAllTrainings = (state: TrainingProcess) => {
  state.isTrainingsLoading = false;
};

const endLoadingTrainings = (
  state: TrainingProcess,
  action: PayloadAction<TrainingWithPaginationRdo>
) => {
  state.trainingCatalog = action.payload;
  state.isTrainingCatalogLoading = false;
};

const startLoadingTrainings = (state: TrainingProcess) => {
  state.isTrainingCatalogLoading = true;
};

const errorLoadingTrainings = (state: TrainingProcess) => {
  state.isTrainingCatalogLoading = false;
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

const startSavingTraining = (state: TrainingProcess) => {
  state.isTrainingSaving = true;
};

const endSavingTraining = (state: TrainingProcess) => {
  state.isTrainingSaving = false;
};

const endUpdatingTraining = (
  state: TrainingProcess,
  action: PayloadAction<TrainingRdo>
) => {
  if (state.training) {
    state.training = {
      ...state.training,
      ...action.payload,
    };
  }
  state.isTrainingLoading = false;
};

export const trainingProcess = createSlice({
  name: StoreSlice.TrainingProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTrainings.pending, startLoadingAllTrainings)
      .addCase(getAllTrainings.fulfilled, endLoadingAllTrainings)
      .addCase(getAllTrainings.rejected, errorLoadingAllTrainings)

      .addCase(getTrainings.pending, startLoadingTrainings)
      .addCase(getTrainings.fulfilled, endLoadingTrainings)
      .addCase(getTrainings.rejected, errorLoadingTrainings)

      .addCase(getSpecialForYou.pending, startLoadingSpecialForYou)
      .addCase(getSpecialForYou.fulfilled, endLoadingSpecialForYou)
      .addCase(getSpecialForYou.rejected, errorLoadingSpecialForYou)

      .addCase(getTraining.pending, startLoadingTraining)
      .addCase(getTraining.fulfilled, endLoadingTraining)
      .addCase(getTraining.rejected, errorLoadingTraining)

      .addCase(createTraining.pending, startSavingTraining)
      .addCase(createTraining.fulfilled, endSavingTraining)
      .addCase(createTraining.rejected, endSavingTraining)

      .addCase(updateTraining.pending, startSavingTraining)
      .addCase(updateTraining.fulfilled, endUpdatingTraining)
      .addCase(updateTraining.rejected, endSavingTraining);
  },
  selectors: {
    isTrainingsLoading: (state) => state.isTrainingsLoading,
    trainings: (state) => state.trainings,
    isTrainingCatalogLoading: (state) => state.isTrainingCatalogLoading,
    trainingCatalog: (state) => state.trainingCatalog,
    isSpecialForYouLoading: (state) => state.isSpecialForYouLoading,
    specialForYou: (state) => state.specialForYou,
    isTrainingLoading: (state) => state.isTrainingLoading,
    training: (state) => state.training,
    maxPrice: (state) => state.trainingCatalog?.maxAllPrice || 0,
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
            .slice(0, Limits.SliderSpecialOffers - 1)
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
};
