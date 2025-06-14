import store from '@frontend/store';
import { AuthorizationStatus } from '@frontend/src/const';
import {
  UserWithPaginationRdo,
  TrainingMyOrderTotalWithPaginationRdo,
  TrainingRdo,
  TrainingWithCoachRdo,
  TrainingWithPaginationRdo,
  User,
  UserRdo,
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
  isTrainingSaving: boolean;
};

export type OrderProcess = {
  orders: TrainingMyOrderTotalWithPaginationRdo | null;
  isOrdersLoading: boolean;
  isOrderSaving: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  userAuth: User | null;
  user: UserRdo | null;
  users: UserWithPaginationRdo | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
