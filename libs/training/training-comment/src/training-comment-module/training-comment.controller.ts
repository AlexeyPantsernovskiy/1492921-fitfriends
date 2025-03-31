import { fillDto } from '@project/helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TrainingCommentWithPaginationRdo } from './rdo/training-comment-with-pagination';
import { TrainingCommentRdo } from './rdo/training-comment.rdo';
import { TrainingCommentResponse } from './training-comment.constant';
import { TrainingCommentQuery } from './training-comment.query';
import { TrainingCommentService } from './training-comment.service';

@ApiTags('training comment')
@Controller('comments')
export class TrainingCommentController {
  constructor(
    private readonly trainingCommentService: TrainingCommentService
  ) {}

  @ApiResponse({
    type: TrainingCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingCommentResponse.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.TrainingNotFound,
  })
  @Get('/:trainingId')
  public async show(
    @Param('trainingId') trainingId: number,
    @Query() query: TrainingCommentQuery
  ) {
    const comments = await this.trainingCommentService.getComments(
      trainingId,
      query
    );
    return fillDto(TrainingCommentWithPaginationRdo, comments);
  }

  @ApiResponse({
    type: TrainingCommentRdo,
    status: HttpStatus.CREATED,
    description: TrainingCommentResponse.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.TrainingNotFound,
  })
  @Post('/:trainingId')
  public async create(
    @Param('trainingId') trainingId: number,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.trainingCommentService.addComment(
      trainingId,
      dto
    );
    return fillDto(TrainingCommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,

    description: TrainingCommentResponse.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingCommentResponse.NotAllowed,
  })
  @Delete('/:commentId/:userId')
  public async delete(
    @Param('commentId') commentId: number,
    @Param('userId') userId: string
  ) {
    await this.trainingCommentService.deleteComment(commentId, userId);
  }
}
