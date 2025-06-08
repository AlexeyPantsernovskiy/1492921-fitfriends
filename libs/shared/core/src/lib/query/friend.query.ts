import { Injectable } from '@nestjs/common';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';

import { CommonProperty } from '../swagger/common-property';
import { UserProperty } from '../swagger/user/user-property';
import { FriendProperty } from '../swagger/friend/friend-property';

@Injectable()
export class FriendQuery {
  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  public limit?: number;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  public page?: number;

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
