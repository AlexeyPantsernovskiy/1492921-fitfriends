import { Expose } from 'class-transformer';
//import { ApiProperty } from '@nestjs/swagger';

//import { UserProperty } from '../swagger/user/user-property';
import { Sex } from '../types/sex.enum';
import { UserRole } from '../types/user-role.enum';

export class UserRdo {
  //@ApiProperty(UserProperty.Id.Description)
  @Expose()
  public id: string;

  //@ApiProperty(UserProperty.Email.Description)
  @Expose()
  public email: string;

  //@ApiProperty(UserProperty.Name.Description)
  @Expose()
  public name: string;

  //@ApiProperty(UserProperty.Avatar.Description)
  @Expose()
  public avatar: string;

  //@ApiProperty(UserProperty.Sex.Description)
  @Expose()
  public sex: Sex;

  //@ApiProperty(UserProperty.Birthday.Description)
  @Expose()
  public birthDate: Date;

  //@ApiProperty(UserProperty.Description.Description)
  @Expose()
  public description: string;

  //@ApiProperty(UserProperty.Location.Description)
  @Expose()
  public location: string;

  //@ApiProperty(UserProperty.Photo.Description)
  @Expose()
  public photo1: string;

  //@ApiProperty(UserProperty.Photo.Description)
  @Expose()
  public photo2: string;

  //@ApiProperty(UserProperty.Role.Description)
  @Expose()
  public role: UserRole;
}

export class LoggedUserRdo extends UserRdo {
  //@ApiProperty(UserProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  //@ApiProperty(UserProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}

export class UserTokenRdo {
  //@ApiProperty(UserProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  //@ApiProperty(UserProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}
