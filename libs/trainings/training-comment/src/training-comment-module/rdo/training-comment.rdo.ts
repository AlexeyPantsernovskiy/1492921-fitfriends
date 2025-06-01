import { Comment } from '@project/shared-core';
import { Expose } from 'class-transformer';
import { TrainingCommentApiDoc } from '../training-comment.api-doc';

export class TrainingCommentRdo
  extends TrainingCommentApiDoc
  implements Comment
{
  @Expose()
  public id: number;

  @Expose()
  public userId: string;

  @Expose()
  public trainingId: number;

  @Expose()
  public rating: number;

  @Expose()
  public message: string;

  @Expose()
  public createdAt: Date;
}
