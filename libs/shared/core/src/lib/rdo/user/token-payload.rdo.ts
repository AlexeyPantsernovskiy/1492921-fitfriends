import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '../../swagger/user/user-property';
import { UserRole } from '../../types/user-role.enum';

export class TokenPayloadRdo {
  @ApiProperty(UserProperty.Id.Description)
  @Expose()
  public sub: string;

  @ApiProperty(UserProperty.Email.Description)
  @Expose()
  public email: string;

  @ApiProperty(UserProperty.Name.Description)
  @Expose()
  public name: string;

  @ApiProperty(UserProperty.Role.Description)
  @Expose()
  public role: UserRole;
}
