import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionnaireUserProperty } from '../../swagger/user/questionnaire-user-property';
import { Specialization } from '../../types/specialization.enum';
import { Duration } from '../../types/duration.enum';
import { Level } from '../../types/level.enum';

export class QuestionnaireBaseRdo {
  @ApiProperty(QuestionnaireUserProperty.Specialization.Description)
  @Expose()
  specialization: Specialization[];

  @ApiProperty(QuestionnaireUserProperty.Level.Description)
  @Expose()
  level: Level;
}

export class QuestionnaireUserRdo extends QuestionnaireBaseRdo {
  @ApiProperty(QuestionnaireUserProperty.Duration.Description)
  @Expose()
  duration: Duration;

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

export class QuestionnaireCoachRdo extends QuestionnaireBaseRdo {
  @ApiProperty(QuestionnaireUserProperty.Certificates.Description)
  @Expose()
  public certificates: string[];

  @ApiProperty(QuestionnaireUserProperty.Achievements.Description)
  @Expose()
  achievements: string;

  @ApiProperty(QuestionnaireUserProperty.IamReadyToTrain.Description)
  @Expose()
  isReadyToTrain: boolean;
}

export type QuestionnaireRdo = QuestionnaireUserRdo | QuestionnaireCoachRdo;
