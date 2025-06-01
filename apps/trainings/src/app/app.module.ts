import { Module } from '@nestjs/common';

import { TrainingModule } from '@project/training';
import { TrainingsConfigModule } from '@project/training-config';
import { TrainingOrderModule } from '@project/training-order';

@Module({
  imports: [TrainingModule, TrainingsConfigModule, TrainingOrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
