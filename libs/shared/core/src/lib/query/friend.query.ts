import { SortDirection } from '../interfaces/sort-direction.interface';
import { SortType } from '../interfaces/sort-type.interface';

export interface IFriendQuery {
  limit?: number;
  sortDirection?: SortDirection;
  sortBy?: SortType;
  page?: number;
  userId: string;
}
