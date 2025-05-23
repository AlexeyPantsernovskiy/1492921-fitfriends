import store from '@frontend/store';
import { AuthorizationStatus } from '@frontend/src/const';
import {
  SortType,
  TrainingMyOrderTotalWithPaginationRdo,
  TrainingRdo,
  TrainingWithCoachRdo,
  TrainingWithPaginationRdo,
  User,
} from '@project/shared';

export type TrainingProcess = {
  specialForYou: TrainingRdo[];
  isSpecialForYouLoading: boolean;
  trainings: TrainingWithPaginationRdo | null;
  isTrainingsLoading: boolean;
  training: TrainingWithCoachRdo | null;
  isTrainingLoading: boolean;
  trainingCatalog: TrainingWithPaginationRdo | null;
  isTrainingCatalogLoading: boolean;
  isSavingTraining: boolean;
  orders: TrainingMyOrderTotalWithPaginationRdo | null;
  isOrdersLoading: boolean;
  // trainingComment: TrainingCommentWithPagination | null;
  // isTrainingCommentLoading: boolean;
  // isSuccessAddTrainingComment: boolean;
};

export type SiteProcess = {
  sorting: SortType;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
