import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
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
  CoachQuestionnaire,
  CommonResponse,
  DefaultFile,
  FillUserQuestionnaireDto,
  LoginUserDto,
  QuestionnaireCoachRdo,
  QuestionnaireParam,
  QuestionnaireRdo,
  QuestionnaireUserProperty,
  QuestionnaireUserResponse,
  User,
  UserOperation,
  UserParam,
  UserProperty,
  UserRdo,
  UserResponse,
  UserRole,
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
import { FillCoachQuestionnaireWithFileDto } from './dto/fill-coach-questionnaire-with-file.dto';
import { LoadFileCertificateDto } from './dto/load-file-certificate.dto';

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

  private correctQuestionnaireFilePath(
    questionnaire: CoachQuestionnaire
  ): CoachQuestionnaire {
    return {
      ...questionnaire,
      certificates: questionnaire.certificates.map((certificate) =>
        createUrlForFile(certificate, ApplicationServiceURL.FileServe)
      ),
    };
  }

  private correctFilePath(user: User): User {
    const correctedUser = { ...user };
    correctedUser.avatar = user.avatar
      ? createUrlForFile(user.avatar, ApplicationServiceURL.FileServe)
      : '';
    correctedUser.photo1 = createUrlForFile(
      user.photo1,
      ApplicationServiceURL.FileServe
    );
    correctedUser.photo2 = createUrlForFile(
      user.photo2,
      ApplicationServiceURL.FileServe
    );

    if (user.role === UserRole.Coach && user.questionnaire) {
      correctedUser.questionnaire = this.correctQuestionnaireFilePath(
        correctedUser.questionnaire as CoachQuestionnaire
      );
    }
    return correctedUser;
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
          `Не удалось загрузить фото на сервер по причине: ${error.message}`
        );
      }
    }

    const userResponse = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      { ...dto, ...DefaultFile.UserCard[dto.role] }
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
    return this.correctFilePath(userResponse.data as User);
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

  @Put('/questionnaire-user')
  @ApiOperation(UserOperation.FillUserQuestionnaire)
  @ApiResponse(QuestionnaireUserResponse.Created)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @HttpCode(QuestionnaireUserResponse.Created.status)
  @UseGuards(CheckAuthGuard)
  public async fillUserQuestionnaire(
    @Body() dto: FillUserQuestionnaireDto,
    @Req() req: Request
  ) {
    const userId = req['user']['sub'];
    const { data: questionnaire } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire-user`,
      dto
    );
    return questionnaire;
  }

  @Put('/questionnaire-coach')
  @ApiOperation(UserOperation.FillCoachQuestionnaire)
  @ApiResponse(QuestionnaireUserResponse.Created)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @HttpCode(QuestionnaireUserResponse.Created.status)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    UploadFileInterceptor(
      QuestionnaireUserProperty.CertificateFile.Validate,
      'certificateFile'
    )
  )
  @UseGuards(CheckAuthGuard)
  public async fillCoachQuestionnaire(
    @Body() dto: FillCoachQuestionnaireWithFileDto,
    @Req() req: Request,
    @UploadedFile() certificateFile: Express.Multer.File
  ) {
    const userId = req['user']['sub'];
    try {
      const fileName = await this.uploadFile(certificateFile);
      dto['certificates'] = [fileName];
    } catch (error) {
      throw new InternalServerErrorException(
        `Не удалось загрузить файл с сертификатом на сервер по причине\n${error.message}\n${error?.errors}`
      );
    }
    const { data: questionnaire } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire-coach`,
      dto
    );
    return this.correctQuestionnaireFilePath(questionnaire);
  }

  @Get('questionnaire')
  @ApiOperation(UserOperation.GetQuestionnaire)
  @ApiResponse(QuestionnaireUserResponse.Found)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @HttpCode(QuestionnaireUserResponse.Found.status)
  @UseGuards(CheckAuthGuard)
  public async getQuestionnaire(@Req() req: Request) {
    const userId = req['user']?.sub;
    const userRole = req['user']?.role;
    if (!userId) {
      throw new UnauthorizedException(
        'Объект с данными авторизованного пользователя не был добавлен в запрос'
      );
    }
    const { data: questionnaire } =
      await this.httpService.axiosRef.get<QuestionnaireRdo>(
        `${ApplicationServiceURL.Users}/${userId}/questionnaire`
      );
    // Обработка сертификатов для тренера
    if (userRole === UserRole.Coach && questionnaire) {
      const updatedQuestionnaire = this.correctQuestionnaireFilePath(
        questionnaire as QuestionnaireCoachRdo
      );
      return updatedQuestionnaire;
    }

    return questionnaire;
  }

  @Post('certificates')
  @ApiOperation(UserOperation.AddCertificate)
  @ApiResponse(QuestionnaireUserResponse.UpdateCertificates)
  @ApiResponse(QuestionnaireUserResponse.ForbiddenUpdateCertificates)
  @ApiResponse(QuestionnaireUserResponse.NotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @HttpCode(QuestionnaireUserResponse.UpdateCertificates.status)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    UploadFileInterceptor(
      QuestionnaireUserProperty.CertificateFile.Validate,
      'certificateFile'
    )
  )
  @UseGuards(CheckAuthGuard)
  public async addCertificate(
    @Body() dto: LoadFileCertificateDto,
    @Req() req: Request,
    @UploadedFile() certificateFile: Express.Multer.File
  ) {
    const userId = req['user']['sub'];
    const role = req['user']['role'];
    if (role !== UserRole.Coach) {
      throw new ForbiddenException(
        QuestionnaireUserResponse.ForbiddenUpdateCertificates.description
      );
    }
    let fileName: string;
    try {
      fileName = await this.uploadFile(certificateFile);
    } catch (error) {
      throw new InternalServerErrorException(
        `Не удалось загрузить файл с сертификатом на сервер по причине\n${error.message}\n${error?.errors}`
      );
    }
    const { data: questionnaire } =
      await this.httpService.axiosRef.get<QuestionnaireCoachRdo>(
        `${ApplicationServiceURL.Users}/${userId}/questionnaire`
      );

    if (!questionnaire) {
      throw new NotFoundException(
        QuestionnaireUserResponse.NotFound.description
      );
    }

    const updatedCertificates = [
      ...(questionnaire.certificates || []),
      fileName,
    ];

    const { data: newQuestionnaire } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire-coach`,
      { ...questionnaire, certificates: updatedCertificates }
    );
    return this.correctQuestionnaireFilePath(newQuestionnaire);
  }

  @Patch(`certificates/:${QuestionnaireParam.IndexCertificate.name}`)
  @ApiOperation(UserOperation.UpdateCertificate)
  @ApiResponse(QuestionnaireUserResponse.UpdateCertificates)
  @ApiResponse(QuestionnaireUserResponse.ForbiddenUpdateCertificates)
  @ApiResponse(QuestionnaireUserResponse.NotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(QuestionnaireParam.IndexCertificate)
  @ApiBearerAuth('accessToken')
  @HttpCode(QuestionnaireUserResponse.UpdateCertificates.status)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    UploadFileInterceptor(
      QuestionnaireUserProperty.CertificateFile.Validate,
      'certificateFile'
    )
  )
  @UseGuards(CheckAuthGuard)
  public async updateCertificate(
    @Param(QuestionnaireParam.IndexCertificate.name) indexCertificate: number,
    @Body() dto: LoadFileCertificateDto,
    @Req() req: Request,
    @UploadedFile() certificateFile: Express.Multer.File
  ) {
    const index = Number(indexCertificate);
    const userId = req['user']['sub'];
    const role = req['user']['role'];
    if (role !== UserRole.Coach) {
      throw new ForbiddenException(
        QuestionnaireUserResponse.ForbiddenUpdateCertificates.description
      );
    }
    let fileName: string;
    try {
      fileName = await this.uploadFile(certificateFile);
    } catch (error) {
      throw new InternalServerErrorException(
        `Не удалось загрузить файл с сертификатом на сервер по причине\n${error.message}\n${error?.errors}`
      );
    }
    const { data: questionnaire } =
      await this.httpService.axiosRef.get<QuestionnaireCoachRdo>(
        `${ApplicationServiceURL.Users}/${userId}/questionnaire`
      );

    if (!questionnaire) {
      throw new NotFoundException(QuestionnaireUserResponse.NotFound);
    }
    const updatedCertificates = [...questionnaire.certificates];
    updatedCertificates[index] = fileName;

    const { data: newQuestionnaire } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire-coach`,
      { ...questionnaire, certificates: updatedCertificates }
    );
    return this.correctQuestionnaireFilePath(newQuestionnaire);
  }

  @Delete(`certificates/:${QuestionnaireParam.IndexCertificate.name}`)
  @ApiOperation(UserOperation.DeleteCertificate)
  @ApiResponse(QuestionnaireUserResponse.UpdateCertificates)
  @ApiResponse(QuestionnaireUserResponse.ForbiddenUpdateCertificates)
  @ApiResponse(QuestionnaireUserResponse.NotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(QuestionnaireParam.IndexCertificate)
  @ApiBearerAuth('accessToken')
  @HttpCode(QuestionnaireUserResponse.UpdateCertificates.status)
  @UseGuards(CheckAuthGuard)
  public async deleteCertificate(
    @Param(QuestionnaireParam.IndexCertificate.name) indexCertificate: number,
    @Req() req: Request
  ) {
    const index = Number(indexCertificate);
    const userId = req['user']['sub'];
    const role = req['user']['role'];
    if (role !== UserRole.Coach) {
      throw new ForbiddenException(
        QuestionnaireUserResponse.ForbiddenUpdateCertificates.description
      );
    }
    const { data: questionnaire } =
      await this.httpService.axiosRef.get<QuestionnaireCoachRdo>(
        `${ApplicationServiceURL.Users}/${userId}/questionnaire`
      );

    if (!questionnaire) {
      throw new NotFoundException(QuestionnaireUserResponse.NotFound);
    }
    if (index < 0 || index > questionnaire.certificates.length - 1) {
      throw new BadRequestException(
        'Передан некорректный порядковый номер сертификата'
      );
    }

    const updatedCertificates = [
      ...questionnaire.certificates.slice(0, index),
      ...questionnaire.certificates.slice(index + 1),
    ];
    const { data: newQuestionnaire } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Users}/${userId}/questionnaire-coach`,
      { ...questionnaire, certificates: updatedCertificates }
    );
    return this.correctQuestionnaireFilePath(newQuestionnaire);
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
    return this.correctFilePath(userResponse.data as User);
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
          `Не удалось загрузить фото на сервер по причине: ${error.message}`
        );
      }
    }
    const updateResponse = await this.httpService.axiosRef.patch<UserRdo>(
      `${ApplicationServiceURL.Users}/update`,
      dto
    );
    return this.correctFilePath(updateResponse.data as User);
  }
}
