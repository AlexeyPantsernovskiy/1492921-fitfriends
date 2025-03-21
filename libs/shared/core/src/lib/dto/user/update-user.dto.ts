import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

import { UserProperty } from '../../swagger/user/user-property';
import { LEVELS, LOCATIONS, SEX, SPECIALIZATIONS } from '../../constants/data';
import { Sex } from '../../types/sex.enum';
import { QuestionnaireUserProperty } from '../../swagger/user/questionnaire-user-property';
import { Specialization } from '../../types/specialization.enum';
import { Level } from '../../types/level.enum';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty(UserProperty.Id.Description)
  @IsMongoId({ message: UserProperty.Id.Validate.Message })
  public userId: string;

  @ApiProperty(UserProperty.Avatar.Description)
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty({ ...UserProperty.Name.Description, required: false })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.name !== '')
  @Length(
    UserProperty.Name.Validate.MinLength,
    UserProperty.Name.Validate.MaxLength,
    {
      message: UserProperty.Name.Validate.Message,
    }
  )
  @IsOptional()
  public name?: string;

  @ApiProperty(UserProperty.Description.Description)
  @IsString()
  @ValidateIf((o) => o.description !== '')
  @Length(
    UserProperty.Description.Validate.MinLength,
    UserProperty.Description.Validate.MaxLength,
    {
      message: UserProperty.Description.Validate.Message,
    }
  )
  @IsOptional()
  public description?: string;

  @ApiProperty({
    ...QuestionnaireUserProperty.IsReadyToTrain.Description,
    required: false,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  isReadyToTrain?: boolean;

  @ApiProperty({
    ...QuestionnaireUserProperty.Specialization.Description,
    required: false,
  })
  @ValidateIf((o) => o.specialization !== '')
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value
  )
  @IsArray()
  @ArrayMinSize(1, {
    message: QuestionnaireUserProperty.Specialization.Validate.Message,
  })
  @IsEnum(SPECIALIZATIONS, {
    each: true,
    message: QuestionnaireUserProperty.Specialization.Validate.Message,
  })
  @IsOptional()
  specialization?: Specialization[];

  @ApiProperty({ ...UserProperty.Location.Description, required: false })
  @IsEnum(LOCATIONS, {
    message: UserProperty.Location.Validate.Message,
  })
  @IsOptional()
  public location?: string;

  @ApiProperty({ ...UserProperty.Sex.Description, required: false })
  @IsEnum(SEX, {
    message: UserProperty.Sex.Validate.Message,
  })
  @IsOptional()
  public sex?: Sex;

  @ApiProperty({
    ...QuestionnaireUserProperty.Level.Description,
    required: false,
  })
  @IsEnum(LEVELS, {
    message: QuestionnaireUserProperty.Level.Validate.Message,
  })
  @IsOptional()
  level?: Level;
}
