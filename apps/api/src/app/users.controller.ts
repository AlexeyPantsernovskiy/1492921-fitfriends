import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
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

import {
  CommonResponse,
  DefaultPhoto,
  FillQuestionnaireUserDto,
  LoginUserDto,
  QuestionnaireUserResponse,
  User,
  UserOperation,
  UserParam,
  UserProperty,
  UserRdo,
  UserResponse,
} from '@project/shared-core';
import {
  createUrlForFile,
  multerFileToFormData,
} from '@project/shared-helpers';
import { UploadFileInterceptor } from '@project/interceptors';
import { UploadedFileRdo } from '@project/file-uploader';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckNoAuthGuard } from './guards/check-no-auth.guard.';
import { CreateUserWithPhotoDto } from './dto/create-user-with-photo.dto';
import { MongoIdValidationPipe } from '@project/pipes';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from './interceptors/inject-user-id.interceptor';
import { UpdateUserWithPhotoDto } from './dto/update-user-with-photo.dto';

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

  private correctFilePath(user: User): User {
    return {
      ...user,
      avatar: user.avatar
        ? createUrlForFile(user.avatar, ApplicationServiceURL.FileServe)
        : '',
      photo1: createUrlForFile(user.photo1, ApplicationServiceURL.FileServe),
      photo2: createUrlForFile(user.photo2, ApplicationServiceURL.FileServe),
    };
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
    return this.correctFilePath(userResponse.data);
  }

  @Post('login')
  @ApiOperation(UserOperation.Login)
  @ApiResponse(UserResponse.LoggedSuccess)
  @ApiResponse(UserResponse.LoggedError)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotFound)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const userResponse = await this.httpService.axiosRef.post<UserRdo>(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return this.correctFilePath(userResponse.data);
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
    return this.correctFilePath(userResponse.data);
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
  @ApiResponse(QuestionnaireUserResponse.Created)
  @ApiResponse(QuestionnaireUserResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(UserParam.UserId)
  @HttpCode(QuestionnaireUserResponse.Created.status)
  public async fillQuestionnaire(
    @Param(UserParam.UserId.name, MongoIdValidationPipe)
    userId: string,
    @Body() dto: FillQuestionnaireUserDto
  ) {
    const questionnaireResponse = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire`,
      dto
    );
    return questionnaireResponse.data;
  }

  @Get(':userId/questionnaire')
  @ApiOperation(UserOperation.GetQuestionnaire)
  @ApiResponse(QuestionnaireUserResponse.Get)
  @ApiResponse(QuestionnaireUserResponse.UserNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(UserParam.UserId)
  @HttpCode(QuestionnaireUserResponse.Get.status)
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

  @Patch('update')
  @ApiOperation(UserOperation.Update)
  @ApiResponse(UserResponse.UserUpdated)
  @ApiResponse(UserResponse.UserNotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @HttpCode(UserResponse.UserUpdated.status)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(
    UploadFileInterceptor(UserProperty.PhotoFile.Validate, 'avatarFile')
  )
  public async updateUser(
    @Body() dto: UpdateUserWithPhotoDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    if (avatarFile) {
      try {
        dto['avatar'] = await this.uploadFile(avatarFile);
      } catch (error) {
        throw new InternalServerErrorException(
          `Не удалось загрузить фото на сервер по причине: ${error.message} (${error?.errors})`
        );
      }
    }
    const updateResponse = await this.httpService.axiosRef.patch<UserRdo>(
      `${ApplicationServiceURL.Users}/update`,
      dto
    );
    return this.correctFilePath(updateResponse.data);
  }
}
