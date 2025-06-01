import { Comment, PgEntity, StorableEntity } from '@project/shared-core';

export class TrainingCommentEntity
  extends PgEntity
  implements StorableEntity<Comment>
{
  public userId!: string;
  public trainingId!: number;
  public rating!: number;
  public message!: string;
  public createdAt!: Date;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.userId = comment.userId;
    this.trainingId = comment.trainingId;
    this.rating = comment.rating;
    this.message = comment.message;
    this.createdAt = comment.createdAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      userId: this.userId,
      trainingId: this.trainingId,
      rating: this.rating,
      message: this.message,
      createdAt: this.createdAt,
    };
  }
}
