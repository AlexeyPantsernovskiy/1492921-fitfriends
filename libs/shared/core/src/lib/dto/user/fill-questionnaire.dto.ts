import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

import { LEVELS, SPECIALIZATIONS, DURATIONS } from '../../constants/data';
import { QuestionnaireUserProperty } from '../../swagger/user/questionnaire-user-property';
import {
  BaseQuestionnaire,
  CoachQuestionnaire,
  UserQuestionnaire,
} from '../../types/questionnaire.interface';
import { Specialization } from '../../types/specialization.enum';
import { Duration } from '../../types/duration.enum';
import { Level } from '../../types/level.enum';
import { Transform } from 'class-transformer';
import { UserLimit } from '../../constants/user.constant';

export class FillQuestionnaireBaseDto implements BaseQuestionnaire {
  @ApiProperty(QuestionnaireUserProperty.Specialization.Description)
  @IsNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayMinSize(UserLimit.Specialization.MinCount)
  @ArrayMaxSize(UserLimit.Specialization.MaxCount)
  @IsEnum(SPECIALIZATIONS, {
    each: true,
    message: QuestionnaireUserProperty.Specialization.Validate.Message,
  })
  specialization: Specialization[];

  @ApiProperty(QuestionnaireUserProperty.Level.Description)
  @IsEnum(LEVELS, {
    message: QuestionnaireUserProperty.Level.Validate.Message,
  })
  level: Level;

  @ApiProperty(QuestionnaireUserProperty.IsReadyToTrain.Description)
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isReadyToTrain: boolean;
}

export class FillUserQuestionnaireDto
  extends FillQuestionnaireBaseDto
  implements UserQuestionnaire
{
  @ApiProperty(QuestionnaireUserProperty.Duration.Description)
  @IsEnum(DURATIONS, {
    message: QuestionnaireUserProperty.Duration.Validate.Message,
  })
  duration: Duration;

  @ApiProperty(QuestionnaireUserProperty.CaloriesLose.Description)
  @IsNumber()
  @Min(QuestionnaireUserProperty.CaloriesLose.Validate.Min, {
    message: QuestionnaireUserProperty.CaloriesLose.Validate.Message,
  })
  @Max(QuestionnaireUserProperty.CaloriesLose.Validate.Max, {
    message: QuestionnaireUserProperty.CaloriesLose.Validate.Message,
  })
  caloriesLose: number;

  @ApiProperty(QuestionnaireUserProperty.CaloriesWaste.Description)
  @IsNumber()
  @Min(QuestionnaireUserProperty.CaloriesWaste.Validate.Min, {
    message: QuestionnaireUserProperty.CaloriesWaste.Validate.Message,
  })
  @Max(QuestionnaireUserProperty.CaloriesWaste.Validate.Max, {
    message: QuestionnaireUserProperty.CaloriesWaste.Validate.Message,
  })
  caloriesWaste: number;
}

export class FillCoachQuestionnaireDto
  extends FillQuestionnaireBaseDto
  implements CoachQuestionnaire
{
  @ApiProperty(QuestionnaireUserProperty.Certificates.Description)
  @IsNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayMinSize(UserLimit.Certificates.MinCount, {
    message: QuestionnaireUserProperty.Certificates.Validate.Message,
  })
  public certificates: string[];

  @ApiProperty(QuestionnaireUserProperty.Achievements.Description)
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.achievements !== '')
  @Length(
    QuestionnaireUserProperty.Achievements.Validate.MinLength,
    QuestionnaireUserProperty.Achievements.Validate.MaxLength,
    {
      message: QuestionnaireUserProperty.Achievements.Validate.Message,
    }
  )
  public achievements?: string;

  @ApiProperty(QuestionnaireUserProperty.IamReadyToTrain.Description)
  @IsBoolean()
  isReadyToTrain: boolean;
}

export type FillQuestionnaireDto =
  | FillUserQuestionnaireDto
  | FillCoachQuestionnaireDto;
