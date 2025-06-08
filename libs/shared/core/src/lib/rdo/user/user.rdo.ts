import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '../../swagger/user/user-property';
import { Sex } from '../../types/sex.enum';
import { UserRole } from '../../types/user-role.enum';
import { Questionnaire } from '../../types/questionnaire.interface';
import { FriendProperty } from '../../swagger/friend/friend-property';
import { RequestTrain } from '../../types/request-train.enum';

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

  @ApiProperty(UserProperty.Questionnaire.Description)
  @Expose()
  public questionnaire: Questionnaire;

  @ApiProperty(UserProperty.IsFriend.Description)
  @Expose()
  public isFriend?: boolean;

  @ApiProperty(FriendProperty.RequestTrain.Description)
  @Expose()
  public requestTrain?: RequestTrain;

  @ApiProperty(FriendProperty.RequestUserId.Description)
  @Expose()
  public requestUserId?: string;
}
