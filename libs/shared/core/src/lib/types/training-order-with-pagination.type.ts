import { PaginationResult } from '../interfaces/pagination.interface';
import { TrainingOrderWithTraining } from './training-order-with-training.type';

export type TrainingOrderWithPagination =
  PaginationResult<TrainingOrderWithTraining>;
