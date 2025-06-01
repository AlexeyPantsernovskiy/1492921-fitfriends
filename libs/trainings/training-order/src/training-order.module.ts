import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/training-models';

import { TrainingOrderController } from './training-order.controller';
import { TrainingOrderFactory } from './training-order.factory';
import { TrainingOrderRepository } from './training-order.repository';
import { TrainingOrderService } from './training-order.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [TrainingOrderController],
  providers: [
    TrainingOrderService,
    TrainingOrderRepository,
    TrainingOrderFactory,
  ],
  exports: [],
})
export class TrainingOrderModule {}
