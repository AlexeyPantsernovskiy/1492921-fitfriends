import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import FormData from 'form-data';
import * as url from 'node:url';

import {
  CommonResponse,
  DefaultPhoto,
  FillQuestionnaireDto,
  LoginUserDto,
  QuestionnaireResponse,
  UserOperation,
  UserParam,
  UserProperty,
  UserRdo,
  UserResponse,
} from '@project/shared-core';
import { multerFileToFormData } from '@project/shared-helpers';
import { UploadFileInterceptor } from '@project/interceptors';
import { UploadedFileRdo } from '@project/file-uploader';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckNoAuthGuard } from './guards/check-no-auth.guard.';
import { CreateUserWithPhotoDto } from './dto/create-user-with-photo.dto';
import { MongoIdValidationPipe } from '@project/pipes';

@ApiTags('Users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  private async uploadFile(file: Express.Multer.File): Promise<string | null> {
    const form = new FormData();
    if (file) {
      multerFileToFormData(form, file, 'file');
      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.Files}/upload`,
        form
      );
      return `${data.subDirectory}/${data.hashName}`;
    }
    return null;
  }

  private addFilePath(path: string): string {
    return `${ApplicationServiceURL.FileServe}/${path}`;
  }

  @Post('register')
  @ApiOperation(UserOperation.Register)
  @ApiResponse(UserResponse.UserCreated)
  @ApiResponse(UserResponse.UserExist)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserAuthForbidden)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    UploadFileInterceptor(UserProperty.PhotoFile.Validate, 'avatarFile')
  )
  @UseGuards(CheckNoAuthGuard)
  public async create(
    @Body() dto: CreateUserWithPhotoDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    if (avatarFile) {
      try {
        dto['avatar'] = await this.uploadFile(avatarFile);
      } catch (error) {
        throw new InternalServerErrorException(
          `Не удалось загрузить фото на сервер по причине\n${error.message}\n${error?.errors}`
        );
      }
    }
    // Пока нет интерфейса для загрузки фоток для карточки пользователя, загружаем дефолтные
    dto['photo1'] = DefaultPhoto.UserCard1;
    dto['photo2'] = DefaultPhoto.UserCard1;

    const userResponse = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      dto
    );
    return userResponse.data;
  }

  @Post('login')
  @ApiOperation(UserOperation.Login)
  @ApiResponse(UserResponse.LoggedSuccess)
  @ApiResponse(UserResponse.LoggedError)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotFound)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return data;
  }

  @Get(':userId')
  @ApiOperation(UserOperation.GetUser)
  @ApiResponse(UserResponse.UserFound)
  @ApiResponse(UserResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(UserParam.UserId)
  public async show(
    @Param(UserParam.UserId.name, MongoIdValidationPipe) userId: string
  ) {
    const userResponse = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/${userId}`,
      {}
    );
    return userResponse.data;
  }

  @Post('refresh')
  @ApiOperation(UserOperation.RefreshTokens)
  @ApiResponse(UserResponse.GetTokens)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('refreshToken')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Post('check')
  @ApiOperation(UserOperation.Check)
  @ApiResponse(UserResponse.CheckSuccess)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @HttpCode(UserResponse.CheckSuccess.status)
  public async checkAuth(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/check`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Put(':userId/questionnaire')
  @ApiOperation(UserOperation.FillQuestionnaire)
  @ApiResponse(QuestionnaireResponse.Created)
  @ApiResponse(QuestionnaireResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @HttpCode(QuestionnaireResponse.Created.status)
  public async fillQuestionnaire(
    @Param(UserParam.UserId.name, MongoIdValidationPipe)
    userId: string,
    @Body() dto: FillQuestionnaireDto
  ) {
    const questionnaireResponse = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire`,
      dto
    );
    return questionnaireResponse.data;
  }

  @Get(':userId/questionnaire')
  @ApiOperation(UserOperation.GetQuestionnaire)
  @ApiResponse(QuestionnaireResponse.Get)
  @ApiResponse(QuestionnaireResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @HttpCode(QuestionnaireResponse.Get.status)
  public async getQuestionnaire(
    @Param(UserParam.UserId.name, MongoIdValidationPipe)
    userId: string
  ) {
    const questionnaireResponse = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire`,
      {}
    );
    return questionnaireResponse.data;
  }
}
