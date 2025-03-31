import { SortDirection } from '@project/shared-core';

export const MAX_COMMENTS_COUNT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const TrainingCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid author id',
} as const;

export const TrainingCommentResponse = {
  CommentsFound: 'Successfully found comments of the post',
  CommentCreated: 'Successfully create comment',
  CommentDeleted: 'Successfully delete comment',
  TrainingNotFound: 'Training not found',
  CommentNotFound: 'Comment not found',
  NotAllowed: 'You are not allowed to delete this comment',
} as const;
