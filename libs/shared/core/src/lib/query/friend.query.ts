import { Injectable } from '@nestjs/common';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

import { UserProperty } from '../swagger/user/user-property';
import { FriendProperty } from '../swagger/friend/friend-property';
import { PaginationQuery } from './pagination.query';

@Injectable()
export class FriendQuery extends PaginationQuery {
  @ApiProperty(UserProperty.Id.Description)
  @IsMongoId({ message: UserProperty.Id.Validate.Message })
  public userId: string;

  @ApiProperty({ ...FriendProperty.FriendId.Description, required: false })
  @IsMongoId({ message: FriendProperty.FriendId.Validate.Message })
  @IsOptional()
  public friendId?: string;
}

@Injectable()
export class MyFriendQuery extends OmitType(FriendQuery, ['userId']) {}
