import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { UserProperty } from '../../swagger/user/user-property';
import { FriendProperty } from '../../swagger/friend/friend-property';
import { RequestTrain } from '../../types/request-train.enum';

export class FriendRdo {
  @ApiProperty(UserProperty.Id.Description)
  @Expose()
  public userId: string;

  @ApiProperty(FriendProperty.FriendId.Description)
  @Expose()
  public friendId: string;

  @ApiProperty(FriendProperty.RequestTrain.Description)
  @Expose()
  public requestTrain?: RequestTrain;

  @ApiProperty(FriendProperty.RequestUserId.Description)
  @Expose()
  public requestUserId?: string;
}
