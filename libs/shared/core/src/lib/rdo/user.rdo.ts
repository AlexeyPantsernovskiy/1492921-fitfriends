import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '../swagger/user/user-property';
import { Sex } from '../types/sex.enum';
import { UserRole } from '../types/user-role.enum';
import { QuestionnaireProperty } from '../swagger/user/questionnaire-property';
import { Specialisation } from '../types/specialisation.enum';
import { Time } from '../types/time.enum';
import { Level } from '../types/level.enum';

export class QuestionnaireRdo {
  @ApiProperty(QuestionnaireProperty.Specialisation.Description)
  @Expose()
  specialisation: Specialisation[];

  @ApiProperty(QuestionnaireProperty.Time.Description)
  @Expose()
  time: Time;

  @ApiProperty(QuestionnaireProperty.Level.Description)
  @Expose()
  level: Level;

  @ApiProperty(QuestionnaireProperty.CaloriesLose.Description)
  @Expose()
  caloriesLose: number;

  @ApiProperty(QuestionnaireProperty.CaloriesWaste.Description)
  @Expose()
  caloriesWaste: number;

  @ApiProperty(QuestionnaireProperty.IsReadyToTrain.Description)
  @Expose()
  isReadyToTrain: boolean;
}
export class UserRdo {
  @ApiProperty(UserProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(UserProperty.Email.Description)
  @Expose()
  public email: string;

  @ApiProperty(UserProperty.Name.Description)
  @Expose()
  public name: string;

  @ApiProperty(UserProperty.Avatar.Description)
  @Expose()
  public avatar: string;

  @ApiProperty(UserProperty.Sex.Description)
  @Expose()
  public sex: Sex;

  @ApiProperty(UserProperty.Birthday.Description)
  @Expose()
  public birthday: Date;

  @ApiProperty(UserProperty.Description.Description)
  @Expose()
  public description: string;

  @ApiProperty(UserProperty.Location.Description)
  @Expose()
  public location: string;

  @ApiProperty(UserProperty.Photo.Description)
  @Expose()
  public photo1: string;

  @ApiProperty(UserProperty.Photo.Description)
  @Expose()
  public photo2: string;

  @ApiProperty(UserProperty.Role.Description)
  @Expose()
  public role: UserRole;
}

export class LoggedUserRdo extends UserRdo {
  @ApiProperty(UserProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  @ApiProperty(UserProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}

export class UserTokenRdo {
  @ApiProperty(UserProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  @ApiProperty(UserProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}
