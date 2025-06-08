import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FriendService } from './friend.service';
import {
  CommonResponse,
  FriendOperation,
  FriendParam,
  FriendQuery,
  FriendResponse,
  RequestTrain,
  UpdateOrCheckFriendDto,
  UserResponse,
} from '@project/shared-core';

@ApiTags('Друзья')
@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  @ApiOperation(FriendOperation.Friends)
  @ApiResponse(FriendResponse.FriendsFound)
  public async show(@Query() query: FriendQuery) {
    return await this.friendService.getFriends(query);
  }

  @Post()
  @ApiOperation(FriendOperation.Add)
  @ApiResponse(FriendResponse.FriendAdded)
  @ApiResponse(FriendResponse.RecordExists)
  @ApiResponse(FriendResponse.AddingSelf)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotFound)
  public async addFriend(@Body() dto: UpdateOrCheckFriendDto) {
    return await this.friendService.addFriend(dto);
  }

  @Delete()
  @ApiOperation(FriendOperation.Delete)
  @ApiResponse(FriendResponse.FriendDeleted)
  @ApiResponse(FriendResponse.FriendNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  public async deleteFriend(@Body() dto: UpdateOrCheckFriendDto) {
    await this.friendService.deleteFriend(dto);
  }

  @Patch('request-train/:action')
  @ApiOperation(FriendOperation.RequestTrain)
  @ApiResponse(FriendResponse.RequestComplete)
  @ApiResponse(FriendResponse.RequestExists)
  @ApiResponse(FriendResponse.RequestSelf)
  @ApiResponse(FriendResponse.RequestNotExists)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(FriendParam.Action)
  public async requestTrain(
    @Param('action') action: RequestTrain,
    @Body() dto: UpdateOrCheckFriendDto
  ) {
    return await this.friendService.requestTrain(dto, action);
  }
}
