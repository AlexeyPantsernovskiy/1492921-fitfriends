import { PaginationResult } from '../interfaces/pagination.interface';
import { Training } from './training.interface';

export type TrainingWithPagination = PaginationResult<Training> & {
  maxAllPrice: number;
};
