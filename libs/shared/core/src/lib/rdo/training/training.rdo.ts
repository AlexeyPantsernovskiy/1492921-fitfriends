import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TrainingProperty } from '../../swagger/training/training-property';
import { Duration } from '../../types/duration.enum';
import { Level } from '../../types/level.enum';
import { Sex } from '../../types/sex.enum';
import { Specialization } from '../../types/specialization.enum';
import { Training } from '../../types/training.interface';

export class TrainingRdo implements Training {
  @ApiProperty(TrainingProperty.Id.Description)
  @Expose()
  id: number;

  @ApiProperty(TrainingProperty.Name.Description)
  @Expose()
  name: string;

  @ApiProperty(TrainingProperty.Image.Description)
  @Expose()
  image: string;

  @ApiProperty(TrainingProperty.Level.Description)
  @Expose()
  level: Level;

  @ApiProperty(TrainingProperty.Specialization.Description)
  @Expose()
  specialization: Specialization;

  @ApiProperty(TrainingProperty.Duration.Description)
  @Expose()
  duration: Duration;

  @ApiProperty(TrainingProperty.Price.Description)
  @Expose()
  price: number;

  @ApiProperty(TrainingProperty.Calories.Description)
  @Expose()
  calories: number;

  @ApiProperty(TrainingProperty.Description.Description)
  @Expose()
  description: string;

  @ApiProperty(TrainingProperty.Sex.Description)
  @Expose()
  sex: Sex;

  @ApiProperty(TrainingProperty.Video.Description)
  @Expose()
  video: string;

  @ApiProperty(TrainingProperty.Rating.Description)
  @Expose()
  rating: number;

  @ApiProperty(TrainingProperty.CoachId.Description)
  @Expose()
  coachId: string;

  @ApiProperty(TrainingProperty.IsSpecialOffer.Description)
  @Expose()
  isSpecialOffer: boolean;

  @ApiProperty(TrainingProperty.CreateDate.Description)
  createDate?: Date;
}
