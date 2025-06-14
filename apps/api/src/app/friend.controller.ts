import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as url from 'node:url';

import {
  CommonResponse,
  FriendOperation,
  FriendParam,
  FriendResponse,
  MyFriendQuery,
  RequestTrain,
  UpdateOrCheckFriendDto,
  UserParam,
  UserResponse,
} from '@project/shared-core';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags('Друзья')
@Controller('friends')
@UseFilters(AxiosExceptionFilter)
export class FriendController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiOperation(FriendOperation.Friends)
  @ApiResponse(FriendResponse.FriendsFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @HttpCode(FriendResponse.FriendsFound.status)
  @UseGuards(CheckAuthGuard)
  public async getFriends(@Query() query: MyFriendQuery, @Req() req: Request) {
    const userId = req['user']?.sub;
    //const userRole = req['user']?.role;
    if (!userId) {
      throw new UnauthorizedException(
        'Объект с данными авторизованного пользователя не был добавлен в запрос'
      );
    }
    if (query['userId']) {
      new BadRequestException('Параметр userId запрещено указывать в запросе');
    }
    const queryString = `${url.parse(req.url).query}&userId=${userId}`;
    const { data: friends } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Friends}?${queryString}`
    );
    // Получение карточек друзей
    const friendsWithUserInfo = await Promise.all(
      friends.entities.map(async (friend) => {
        const { data: user } = await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Api}/users/${userId === friend.userId ? friend.friendId : friend.userId}`,
          {
            headers: {
              Authorization: req.headers['authorization'],
            },
          }
        );
        return user;
      })
    );
    return {
      ...friends,
      entities: friendsWithUserInfo,
    };
  }

  @Post(`:${UserParam.UserId.name}`)
  @ApiOperation(FriendOperation.Add)
  @ApiResponse(FriendResponse.FriendAdded)
  @ApiResponse(FriendResponse.RecordExists)
  @ApiResponse(FriendResponse.AddingSelf)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiParam(UserParam.UserId)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async addFriend(
    @Param(UserParam.UserId.name) friendId: string,
    @Req() req: Request
  ) {
    const userId = req['user']?.sub;
    if (!userId) {
      throw new UnauthorizedException(
        'Объект с данными авторизованного пользователя не был добавлен в запрос'
      );
    }
    const dto: UpdateOrCheckFriendDto = { userId, friendId };
    const { data: friend } = await this.httpService.axiosRef.post(
      ApplicationServiceURL.Friends,
      dto
    );
    // Получение карточки друга
    const { data: user } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Api}/users/${friend.friendId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return user;
  }

  @Delete(`:${UserParam.UserId.name}`)
  @ApiOperation(FriendOperation.Delete)
  @ApiResponse(FriendResponse.FriendDeleted)
  @ApiResponse(FriendResponse.FriendNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiParam(UserParam.UserId)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async deleteFriend(
    @Param(UserParam.UserId.name) friendId: string,
    @Req() req: Request
  ) {
    const userId = req['user']?.sub;
    if (!userId) {
      //const userRole = req['user']?.role;
      throw new UnauthorizedException(
        'Объект с данными авторизованного пользователя не был добавлен в запрос'
      );
    }
    const data: UpdateOrCheckFriendDto = { userId, friendId };
    await this.httpService.axiosRef.delete(ApplicationServiceURL.Friends, {
      data,
    });
  }

  @Patch('request-train/:action/:userId')
  @ApiOperation(FriendOperation.RequestTrain)
  @ApiResponse(FriendResponse.RequestComplete)
  @ApiResponse(FriendResponse.RequestExists)
  @ApiResponse(FriendResponse.RequestSelf)
  @ApiResponse(FriendResponse.RequestNotExists)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(FriendParam.Action)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async requestTrain(
    @Param(FriendParam.Action.name) action: RequestTrain,
    @Param(UserParam.UserId.name) friendId: string,
    @Req() req: Request
  ) {
    const userId = req['user']?.sub;
    if (!userId) {
      //const userRole = req['user']?.role;
      throw new UnauthorizedException(
        'Объект с данными авторизованного пользователя не был добавлен в запрос'
      );
    }
    const data: UpdateOrCheckFriendDto = { userId, friendId };
    await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Friends}/request-train/${action}`,
      data
    );
    // Получение карточки друга
    const { data: user } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Api}/users/${friendId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return user;
  }
}
