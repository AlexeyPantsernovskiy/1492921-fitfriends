import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/training-models';

import { TrainingController } from './training.controller';
import { TrainingFactory } from './training.factory';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, TrainingFactory],
  exports: [TrainingService],
})
export class TrainingModule {}
