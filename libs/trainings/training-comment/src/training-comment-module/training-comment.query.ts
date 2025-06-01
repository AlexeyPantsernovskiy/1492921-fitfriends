import { SortDirection } from '@project/shared-core';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_SORT_DIRECTION,
  MAX_COMMENTS_COUNT,
} from './training-comment.constant';

export class TrainingCommentQuery {
  public limit: number = MAX_COMMENTS_COUNT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
