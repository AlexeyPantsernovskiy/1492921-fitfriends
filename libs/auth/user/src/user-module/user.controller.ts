import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
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
  FillQuestionnaireUserDto,
  LoggedUserRdo,
  LoginUserDto,
  QuestionnaireUserResponse,
  TokenPayloadRdo,
  UpdateUserDto,
  UserOperation,
  UserParam,
  UserResponse,
} from '@project/shared-core';

import { UserService } from './user.service';
import { RequestWithUser } from '../../../../shared/core/src/lib/interfaces/request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithTokenPayload } from '../../../../shared/core/src/lib/interfaces/request-with-token-payload.interface';
import { QuestionnaireUserService } from './questionnaire-user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly questionnaireUserService: QuestionnaireUserService
  ) {}

  @Post('register')
  @ApiOperation(UserOperation.Register)
  @ApiResponse(UserResponse.UserCreated)
  @ApiResponse(UserResponse.UserExist)
  @ApiResponse(CommonResponse.BadRequest)
  public async create(@Body() dto: CreateUserDto) {
    return await this.userService.register(dto);
  }

  @Post('login')
  @ApiOperation(UserOperation.Login)
  @ApiResponse(UserResponse.LoggedSuccess)
  @ApiResponse(UserResponse.LoggedError)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotFound)
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.userService.verifyUser(dto);
    if (user) {
      const userToken = await this.userService.createUserToken(user);

      return fillDto(LoggedUserRdo, { ...user, ...userToken });
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
    return await this.userService.getUserById(userId);
  }

  @Post('refresh')
  @ApiOperation(UserOperation.RefreshTokens)
  @ApiResponse(UserResponse.GetTokens)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('refreshToken')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.userService.createUserToken(user);
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

  @Put(':userId/questionnaire')
  @ApiOperation(UserOperation.FillQuestionnaire)
  @ApiResponse(QuestionnaireUserResponse.Created)
  @ApiResponse(QuestionnaireUserResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(UserParam.UserId)
  @HttpCode(QuestionnaireUserResponse.Created.status)
  public async fillQuestionnaire(
    @Param(UserParam.UserId.name, MongoIdValidationPipe) userId: string,
    @Body() dto: FillQuestionnaireUserDto
  ) {
    return await this.questionnaireUserService.fill(userId, dto);
  }

  @Get(':userId/questionnaire')
  @ApiOperation(UserOperation.GetQuestionnaire)
  @ApiResponse(QuestionnaireUserResponse.Get)
  @ApiResponse(QuestionnaireUserResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(UserParam.UserId)
  @HttpCode(QuestionnaireUserResponse.Get.status)
  public async getQuestionnaire(
    @Param(UserParam.UserId.name, MongoIdValidationPipe) userId: string
  ) {
    return await this.questionnaireUserService.get(userId);
  }

  @Patch('update')
  @ApiOperation(UserOperation.Update)
  @ApiResponse(UserResponse.UserUpdated)
  @ApiResponse(UserResponse.UserNotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @HttpCode(UserResponse.UserUpdated.status)
  public async updateUser(@Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(dto);
  }
}
