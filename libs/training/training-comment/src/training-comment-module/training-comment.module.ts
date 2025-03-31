import { TrainingModule } from '@project/training';
import { PrismaClientModule } from '@project/training-models';
import { Module } from '@nestjs/common';
import { TrainingCommentController } from './training-comment.controller';
import { TrainingCommentFactory } from './training-comment.factory';
import { TrainingCommentRepository } from './training-comment.repository';
import { TrainingCommentService } from './training-comment.service';

@Module({
  imports: [PrismaClientModule, TrainingModule],
  controllers: [TrainingCommentController],
  providers: [
    TrainingCommentService,
    TrainingCommentRepository,
    TrainingCommentFactory,
  ],
  exports: [TrainingCommentRepository, TrainingCommentFactory],
})
export class TrainingCommentModule {}
