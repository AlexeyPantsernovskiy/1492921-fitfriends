import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '../../swagger/user/user-property';

export class UserInfoRdo {
  @ApiProperty(UserProperty.Name.Description)
  @Expose()
  public name: string;

  @ApiProperty(UserProperty.Avatar.Description)
  @Expose()
  public avatar: string;
}
