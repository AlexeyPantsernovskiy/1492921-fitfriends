import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TrainingProperty } from '../../swagger/training/training-property';
import { TrainingRdo } from './training.rdo';
import { UserInfoRdo } from '../user/user-info.rdo';

export class TrainingWithCoachRdo extends TrainingRdo {
  @ApiProperty(TrainingProperty.Coach.Description)
  @Expose()
  coach: UserInfoRdo;
}
