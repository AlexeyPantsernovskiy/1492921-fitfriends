import { SortDirection } from '../types/sort-direction.enum';
import { SortType } from '../types/sort-type.enum';

export const FriendSortDefault = {
  Direction: SortDirection.Desc,
  Type: SortType.Date,
} as const;

export const FriendErrorMessage = {
  SelfFriend: 'Запрещено добавлять в друзья самого себя (userId = friendId)',
} as const;
