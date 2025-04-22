import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

import { CommonProperty } from '../swagger/common-property';
import { DURATIONS, LEVELS, SEX, SPECIALIZATIONS } from '../constants/data';
import { Specialization } from '../types/specialization.enum';
import { QuestionnaireUserProperty } from '../swagger/user/questionnaire-user-property';
import { Sex } from '../types/sex.enum';
import { Level } from '../types/level.enum';
import { Duration } from '../types/duration.enum';
import { UserProperty } from '../swagger/user/user-property';

export class SpecialForYouQuery {
  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  public limit?: number;

  @ApiProperty(UserProperty.Sex.Description)
  @IsEnum(SEX, {
    message: UserProperty.Sex.Validate.Message,
  })
  public sex: Sex;

  @ApiProperty(QuestionnaireUserProperty.Specialization.Description)
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(SPECIALIZATIONS, {
    each: true,
    message: QuestionnaireUserProperty.Specialization.Validate.Message,
  })
  specializations: Specialization[];

  @ApiProperty(QuestionnaireUserProperty.Duration.Description)
  @IsEnum(DURATIONS, {
    message: QuestionnaireUserProperty.Duration.Validate.Message,
  })
  duration: Duration;

  @ApiProperty(QuestionnaireUserProperty.Level.Description)
  @IsEnum(LEVELS, {
    message: QuestionnaireUserProperty.Level.Validate.Message,
  })
  level: Level;

  @ApiProperty(QuestionnaireUserProperty.CaloriesWaste.Description)
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(QuestionnaireUserProperty.CaloriesWaste.Validate.Min, {
    message: QuestionnaireUserProperty.CaloriesWaste.Validate.Message,
  })
  @Max(QuestionnaireUserProperty.CaloriesWaste.Validate.Max, {
    message: QuestionnaireUserProperty.CaloriesWaste.Validate.Message,
  })
  calories: number;
}
