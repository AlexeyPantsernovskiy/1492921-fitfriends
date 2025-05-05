import { Module } from '@nestjs/common';

import { TrainingModule } from '@project/training';
import { TrainingConfigModule } from '@project/training-config';
import { TrainingOrderModule } from '@project/training-order';

@Module({
  imports: [TrainingModule, TrainingConfigModule, TrainingOrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
