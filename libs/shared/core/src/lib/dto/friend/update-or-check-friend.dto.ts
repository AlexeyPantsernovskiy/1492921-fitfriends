import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, ValidateIf } from 'class-validator';

import { UserProperty } from '../../swagger/user/user-property';
import { Friend } from '../../types/friend.interface';
import { FriendProperty } from '../../swagger/friend/friend-property';

export class UpdateOrCheckFriendDto implements Omit<Friend, 'id'> {
  @ApiProperty(UserProperty.Id.Description)
  @IsString()
  @ValidateIf((o) => o.userId !== '')
  @IsMongoId({ message: UserProperty.Id.Validate.Message })
  userId: string;

  @ApiProperty(FriendProperty.FriendId.Description)
  @IsString()
  @IsMongoId({ message: FriendProperty.FriendId.Validate.Message })
  friendId: string;
}
