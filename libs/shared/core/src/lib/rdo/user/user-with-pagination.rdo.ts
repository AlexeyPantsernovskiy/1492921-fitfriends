import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationRdo } from '../pagination.rdo';
import { UserRdo } from './user.rdo';
import { UserProperty } from '../../swagger/user/user-property';

export class UserWithPaginationRdo extends PaginationRdo {
  @ApiProperty({ ...UserProperty.Users.Description, type: [UserRdo] })
  @Type(() => UserRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: UserRdo[];
}
