import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionnaireUserProperty } from '../../swagger/user/questionnaire-user-property';
import { Specialization } from '../../types/specialization.enum';
import { Duration } from '../../types/duration.enum';
import { Level } from '../../types/level.enum';

export class QuestionnaireUserRdo {
  @ApiProperty(QuestionnaireUserProperty.Specialization.Description)
  @Expose()
  specialization: Specialization[];

  @ApiProperty(QuestionnaireUserProperty.Duration.Description)
  @Expose()
  duration: Duration;

  @ApiProperty(QuestionnaireUserProperty.Level.Description)
  @Expose()
  level: Level;

  @ApiProperty(QuestionnaireUserProperty.CaloriesLose.Description)
  @Expose()
  caloriesLose: number;

  @ApiProperty(QuestionnaireUserProperty.CaloriesWaste.Description)
  @Expose()
  caloriesWaste: number;

  @ApiProperty(QuestionnaireUserProperty.IsReadyToTrain.Description)
  @Expose()
  isReadyToTrain: boolean;
}
