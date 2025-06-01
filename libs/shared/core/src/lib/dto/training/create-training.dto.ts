import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

import { currencyParser } from '@project/shared-helpers';

import { Training } from '../../types/training.interface';
import { TrainingProperty } from '../../swagger/training/training-property';
import { DURATIONS, LEVELS, SEX, SPECIALIZATIONS } from '../../constants/data';
import { Level } from '../../types/level.enum';
import { Specialization } from '../../types/specialization.enum';
import { Duration } from '../../types/duration.enum';
import { Sex } from '../../types/sex.enum';

export class CreateTrainingDto
  implements Omit<Training, 'id' | 'createdDate' | 'rating'>
{
  @ApiProperty(TrainingProperty.Name.Description)
  @IsString()
  @ValidateIf((o) => o.name !== '')
  @Length(
    TrainingProperty.Name.Validate.MinLength,
    TrainingProperty.Name.Validate.MaxLength,
    { message: TrainingProperty.Name.Validate.Message }
  )
  name: string;

  @ApiProperty(TrainingProperty.Image.Description)
  @IsString()
  @ValidateIf((o) => o.image !== '')
  image: string;

  @ApiProperty(TrainingProperty.Level.Description)
  @ValidateIf((o) => o.level)
  @IsIn(LEVELS, { message: TrainingProperty.Level.Validate.Message })
  level: Level;

  @ApiProperty(TrainingProperty.Specialization.Description)
  @ValidateIf((o) => o.specialization)
  @IsIn(SPECIALIZATIONS, {
    message: TrainingProperty.Specialization.Validate.Message,
  })
  specialization: Specialization;

  @ApiProperty(TrainingProperty.Duration.Description)
  @ValidateIf((o) => o.duration)
  @IsIn(DURATIONS, {
    message: TrainingProperty.Duration.Validate.Message,
  })
  duration: Duration;

  @ApiProperty(TrainingProperty.Price.Description)
  @ValidateIf((o) => o.price)
  @Transform(({ value }) => currencyParser(value))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(TrainingProperty.Price.Validate.Min, {
    message: TrainingProperty.Price.Validate.Message,
  })
  price: number;

  @ApiProperty(TrainingProperty.Calories.Description)
  @ValidateIf((o) => o.calories)
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(TrainingProperty.Calories.Validate.Min, {
    message: TrainingProperty.Calories.Validate.Message,
  })
  @Max(TrainingProperty.Calories.Validate.Max, {
    message: TrainingProperty.Calories.Validate.Message,
  })
  calories: number;

  @ApiProperty(TrainingProperty.Description.Description)
  @IsString()
  @ValidateIf((o) => o.description !== '')
  @Length(
    TrainingProperty.Description.Validate.MinLength,
    TrainingProperty.Description.Validate.MaxLength,
    { message: TrainingProperty.Description.Validate.Message }
  )
  description: string;

  @ApiProperty(TrainingProperty.Sex.Description)
  @ValidateIf((o) => o.sex)
  @IsEnum(SEX, {
    message: TrainingProperty.Sex.Validate.Message,
  })
  sex: Sex;

  @ApiProperty(TrainingProperty.Video.Description)
  @IsString()
  @ValidateIf((o) => o.coachId !== '')
  video: string;

  @ApiProperty(TrainingProperty.CoachId.Description)
  @IsString()
  @ValidateIf((o) => o.coachId !== '')
  @IsMongoId({ message: TrainingProperty.CoachId.Validate.Message })
  coachId: string;

  @ApiProperty(TrainingProperty.IsSpecialOffer.Description)
  @ValidateIf((o) => o.isSpecialOffer)
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isSpecialOffer: boolean;
}
