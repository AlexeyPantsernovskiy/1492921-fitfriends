import { Comment, EntityFactory } from '@project/shared-core';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TrainingCommentEntity } from './training-comment.entity';

@Injectable()
export class TrainingCommentFactory
  implements EntityFactory<TrainingCommentEntity>
{
  public create(entityPlainData: Comment): TrainingCommentEntity {
    return new TrainingCommentEntity(entityPlainData);
  }

  public static composeFromCreateCommentDto(
    dto: CreateCommentDto
  ): TrainingCommentEntity {
    const newComment = new TrainingCommentEntity();

    newComment.id = undefined;
    newComment.message = dto.message;
    newComment.rating = dto.rating;
    newComment.trainingId = dto.trainingId;
    newComment.userId = dto.userId;
    newComment.createdAt = dayjs().toDate();

    return newComment;
  }
}
