import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
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

import { UserProperty } from '../swagger/user/user-property';

import { Transform } from 'class-transformer';
import { UserRegister } from '../types/user-register.interface';
import {
  LEVELS,
  LOCATIONS,
  SEX,
  SPECIALISATIONS,
  TIMES,
} from '../constants/data';
import { Role, UserRole } from '../types/user-role.enum';
import { Sex } from '../types/sex.enum';
import { UserLogin } from '../types/user-login.interface';
import { QuestionnaireProperty } from '../swagger/user/questionnaire-property';
import { Questionnaire } from '../types/questionnaire.interface';
import { Specialisation } from '../types/specialisation.enum';
import { Time } from '../types/time.enum';
import { Level } from '../types/level.enum';

export class LoginUserDto implements UserLogin {
  @ApiProperty(UserProperty.Email.Description)
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: UserProperty.Email.Validate.Message })
  public email: string;

  @ApiProperty(UserProperty.Password.Description)
  @IsString()
  @IsNotEmpty()
  @Length(
    UserProperty.Password.Validate.MinLength,
    UserProperty.Password.Validate.MaxLength,
    {
      message: UserProperty.Password.Validate.Message,
    }
  )
  public password: string;
}

export class CreateUserDto extends LoginUserDto implements UserRegister {
  @ApiProperty(UserProperty.Name.Description)
  @IsString()
  @IsNotEmpty()
  @Length(
    UserProperty.Name.Validate.MinLength,
    UserProperty.Name.Validate.MaxLength,
    {
      message: UserProperty.Name.Validate.Message,
    }
  )
  public name: string;

  @ApiProperty(UserProperty.Avatar.Description)
  @IsString()
  @IsOptional()
  public avatar?: string;

  @ApiProperty(UserProperty.Sex.Description)
  @IsEnum(SEX, {
    message: UserProperty.Sex.Validate.Message,
  })
  public sex: Sex;

  @ApiProperty(UserProperty.Birthday.Description)
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @IsOptional()
  public birthday?: Date;

  @ApiProperty(UserProperty.Description.Description)
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.description !== '')
  @Length(
    UserProperty.Description.Validate.MinLength,
    UserProperty.Description.Validate.MaxLength,
    {
      message: UserProperty.Description.Validate.Message,
    }
  )
  public description?: string;

  @ApiProperty(UserProperty.Location.Description)
  @IsEnum(LOCATIONS, {
    message: UserProperty.Location.Validate.Message,
  })
  public location: string;

  @ApiProperty(UserProperty.Photo.Description)
  @IsString()
  public photo1: string;

  @ApiProperty(UserProperty.Photo.Description)
  @IsString()
  public photo2: string;

  @ApiProperty(UserProperty.Role.Description)
  @IsEnum(Object.values(Role), {
    message: UserProperty.Role.Validate.Message,
  })
  public role: UserRole;
}
export class FillQuestionnaireDto implements Questionnaire {
  @ApiProperty(QuestionnaireProperty.Specialisation.Description)
  @IsNotEmpty()
  @IsArray()
  @IsEnum(SPECIALISATIONS, {
    each: true,
    message: QuestionnaireProperty.Specialisation.Validate.Message,
  })
  specialisation: Specialisation[];

  @ApiProperty(QuestionnaireProperty.Time.Description)
  @IsEnum(TIMES, {
    message: QuestionnaireProperty.Time.Validate.Message,
  })
  time: Time;

  @ApiProperty(QuestionnaireProperty.Level.Description)
  @IsEnum(LEVELS, {
    message: QuestionnaireProperty.Level.Validate.Message,
  })
  level: Level;

  @ApiProperty(QuestionnaireProperty.CaloriesLose.Description)
  @IsNumber()
  @Min(QuestionnaireProperty.CaloriesLose.Validate.Min, {
    message: QuestionnaireProperty.CaloriesLose.Validate.Message,
  })
  @Max(QuestionnaireProperty.CaloriesLose.Validate.Max, {
    message: QuestionnaireProperty.CaloriesLose.Validate.Message,
  })
  caloriesLose: number;

  @ApiProperty(QuestionnaireProperty.CaloriesWaste.Description)
  @IsNumber()
  @Min(QuestionnaireProperty.CaloriesWaste.Validate.Min, {
    message: QuestionnaireProperty.CaloriesWaste.Validate.Message,
  })
  @Max(QuestionnaireProperty.CaloriesWaste.Validate.Max, {
    message: QuestionnaireProperty.CaloriesWaste.Validate.Message,
  })
  caloriesWaste: number;

  @ApiProperty(QuestionnaireProperty.IsReadyToTrain.Description)
  @IsBoolean()
  isReadyToTrain: boolean;
}
