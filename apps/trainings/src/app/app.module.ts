import { Module } from '@nestjs/common';

import { TrainingModule } from '@project/training';
import { TrainingConfigModule } from '@project/training-config';

@Module({
  //imports: [TrainingModule, TrainingCommentModule, TrainingConfigModule],
  imports: [TrainingModule, TrainingConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
