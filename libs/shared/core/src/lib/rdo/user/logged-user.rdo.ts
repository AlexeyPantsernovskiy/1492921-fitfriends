import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '../../swagger/user/user-property';
import { UserRdo } from './user.rdo';

export class LoggedUserRdo extends UserRdo {
  @ApiProperty(UserProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  @ApiProperty(UserProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}
