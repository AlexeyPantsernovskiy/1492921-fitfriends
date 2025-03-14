import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/shared-helpers';
import {
  CommonResponse,
  CreateUserDto,
  LoggedUserRdo,
  LoginUserDto,
  TokenPayloadRdo,
  UserOperation,
  UserParam,
  UserRdo,
  UserResponse,
  UserTokenRdo,
} from '@project/shared-core';

import { UserService } from './user.service';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation(UserOperation.Register)
  @ApiResponse(UserResponse.UserCreated)
  @ApiResponse(UserResponse.UserExist)
  @ApiResponse(CommonResponse.BadRequest)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  @ApiOperation(UserOperation.Login)
  @ApiResponse(UserResponse.LoggedSuccess)
  @ApiResponse(UserResponse.LoggedError)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotFound)
  public async login(
    @Body() dto: LoginUserDto,
    @Req() { user }: RequestWithUser
  ) {
    user = await this.userService.verifyUser(dto);
    if (user) {
      const userToken = await this.userService.createUserToken(user);

      return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
    }
  }

  @Get(':userId')
  @ApiOperation(UserOperation.GetUser)
  @ApiResponse(UserResponse.UserFound)
  @ApiResponse(UserResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(UserParam.UserId)
  public async show(
    @Param(UserParam.UserId.name, MongoIdValidationPipe)
    userId: string
  ) {
    const existUser = await this.userService.getUserById(userId);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Post('refresh')
  @ApiOperation(UserOperation.RefreshTokens)
  @ApiResponse(UserResponse.GetTokens)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('refreshToken')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return fillDto(UserTokenRdo, this.userService.createUserToken(user));
  }

  @Post('check')
  @ApiOperation(UserOperation.Check)
  @ApiResponse(UserResponse.CheckSuccess)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return fillDto(TokenPayloadRdo, payload);
  }
}
