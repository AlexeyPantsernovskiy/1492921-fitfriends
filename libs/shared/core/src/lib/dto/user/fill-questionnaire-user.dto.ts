import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

import { LEVELS, SPECIALIZATIONS, TIMES } from '../../constants/data';
import { QuestionnaireUserProperty } from '../../swagger/user/questionnaire-user-property';
import { Questionnaire } from '../../types/questionnaire.interface';
import { Specialization } from '../../types/specialization.enum';
import { Time } from '../../types/time.enum';
import { Level } from '../../types/level.enum';

export class FillQuestionnaireUserDto implements Questionnaire {
  @ApiProperty(QuestionnaireUserProperty.Specialization.Description)
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(SPECIALIZATIONS, {
    each: true,
    message: QuestionnaireUserProperty.Specialization.Validate.Message,
  })
  specialization: Specialization[];

  @ApiProperty(QuestionnaireUserProperty.Time.Description)
  @IsEnum(TIMES, {
    message: QuestionnaireUserProperty.Time.Validate.Message,
  })
  time: Time;

  @ApiProperty(QuestionnaireUserProperty.Level.Description)
  @IsEnum(LEVELS, {
    message: QuestionnaireUserProperty.Level.Validate.Message,
  })
  level: Level;

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

  @ApiProperty(QuestionnaireUserProperty.IsReadyToTrain.Description)
  @IsBoolean()
  isReadyToTrain: boolean;
}
