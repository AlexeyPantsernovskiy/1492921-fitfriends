import 'multer';
import * as url from 'node:url';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
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
import qs from 'qs';
import { faker } from '@faker-js/faker/locale/ru';
import FormData from 'form-data';

import {
  AVATAR_DEFAULT,
  CommonResponse,
  LimitQuery,
  QuestionnaireDefault,
  SpecialForYouQuery,
  TrainingOperation,
  TrainingParam,
  TrainingProperty,
  TrainingQuery,
  TrainingResponse,
  UserQuestionnaire,
  UserRdo,
  UserResponse,
  UserRole,
} from '@project/shared-core';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import {
  createUrlForFile,
  multerFileToFormData,
} from '@project/shared-helpers';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CreateTrainingWithVideoDto } from './dto/create-training-with-video.dto';
import { UploadFileInterceptor } from '@project/interceptors';
import { UploadedFileRdo } from '@project/file-uploader';
import { UpdateTrainingWithVideoDto } from './dto/update-training-with-video.dto';

@ApiTags('Тренировки')
@Controller('trainings')
@UseFilters(AxiosExceptionFilter)
export class TrainingsController {
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

  @Get('')
  @ApiOperation(TrainingOperation.Trainings)
  @ApiResponse(TrainingResponse.Trainings)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async catalog(@Query() _query: TrainingQuery, @Req() req: Request) {
    const queryString = url.parse(req.url).query;
    const response = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Trainings}?${queryString}`,
      {}
    );
    response.data.entities.forEach((item) => {
      item.image = createUrlForFile(
        item.image,
        ApplicationServiceURL.FileServe
      );
      item.video = createUrlForFile(
        item.video,
        ApplicationServiceURL.FileServe
      );
    });
    return response.data;
  }

  @Get('special-for-you')
  @ApiOperation(TrainingOperation.SpecialForYou)
  @ApiResponse(TrainingResponse.Trainings)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async specialForYou(
    @Query() queryLimit: LimitQuery,
    @Req() req: Request
  ) {
    const responseUser = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${req['user']['sub']}`,
      {}
    );
    const user: UserRdo = responseUser.data;
    if (user.role !== UserRole.Sportsman) {
      throw new BadRequestException(
        'Запрос подходящих тренировок предусмотрен только для спортсмена'
      );
    }
    const userQuestionnaire = (user.questionnaire ??
      QuestionnaireDefault[user.sex]) as UserQuestionnaire;
    const query: SpecialForYouQuery = {
      ...queryLimit,
      specializations: userQuestionnaire.specialization,
      sex: user.sex,
      level: userQuestionnaire.level,
      duration: userQuestionnaire.duration,
      calories: userQuestionnaire.caloriesWaste,
    };
    const queryString = qs.stringify(query, { arrayFormat: 'repeat' });
    const response = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Trainings}/special-for-you?${queryString}`,
      {}
    );
    response.data.forEach((item) => {
      item.image = createUrlForFile(
        item.image,
        ApplicationServiceURL.FileServe
      );
      item.video = createUrlForFile(
        item.video,
        ApplicationServiceURL.FileServe
      );
    });
    return response.data;
  }

  @Get(`:${TrainingParam.TrainingId.name}`)
  @ApiOperation(TrainingOperation.View)
  @ApiResponse(TrainingResponse.TrainingFound)
  @ApiResponse(TrainingResponse.TrainingNotFound)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiParam(TrainingParam.TrainingId)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async show(@Param(TrainingParam.TrainingId.name) trainingId: string) {
    const response = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Trainings}/${trainingId}`,
      {}
    );
    response.data.image = createUrlForFile(
      response.data.image,
      ApplicationServiceURL.FileServe
    );
    response.data.video = createUrlForFile(
      response.data.video,
      ApplicationServiceURL.FileServe
    );
    try {
      // Получаем информацию о тренере
      const userResponse = await this.httpService.axiosRef.get<UserRdo>(
        `${ApplicationServiceURL.Users}/${response.data.coachId}`,
        {}
      );
      const coachInfo = {
        name: userResponse.data.name,
        avatar: createUrlForFile(
          userResponse.data.avatar || AVATAR_DEFAULT,
          ApplicationServiceURL.FileServe
        ),
      };
      // Добавляем информацию о тренере в карточку тренировки
      response.data['coach'] = coachInfo;
    } catch (error) {
      response.data['coach'] = {
        name: '--Not found--',
        avatar: '--Not found--',
      };
      throw new Error(
        `Не удалось найти тренера (id = ${response.data.coachId}) для тренировки ${response.data.id}: ${error}`
      );
    }

    return response.data;
  }

  @Post('')
  @ApiOperation(TrainingOperation.Create)
  @ApiResponse(TrainingResponse.TrainingCreated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(TrainingResponse.ForbiddenCreate)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(
    UploadFileInterceptor(TrainingProperty.VideoFile.Validate, 'videoFile')
  )
  public async create(
    @Body() dto: CreateTrainingWithVideoDto,
    @Req() req: Request,
    @UploadedFile() videoFile?: Express.Multer.File
  ) {
    if (req['user']['role'] !== UserRole.Coach) {
      new ForbiddenException(TrainingResponse.ForbiddenCreate.description);
    }
    try {
      dto['video'] = await this.uploadFile(videoFile);
    } catch (error) {
      throw new InternalServerErrorException(
        `Не удалось загрузить фото на сервер по причине: ${error.message}`
      );
    }

    dto['coachId'] = req['user']['sub'];
    dto['image'] =
      `default/training-${faker.number.int({ min: 1, max: 4 })}.jpg`;
    dto['isSpecialOffer'] = false;

    const responseTraining = await this.httpService.axiosRef.post(
      ApplicationServiceURL.Trainings,
      dto
    );
    return await responseTraining.data;
  }

  @Patch(`:${TrainingParam.TrainingId.name}`)
  @ApiOperation(TrainingOperation.Update)
  @ApiResponse(TrainingResponse.TrainingUpdating)
  @ApiResponse(TrainingResponse.ForbiddenUpdate)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiParam(TrainingParam.TrainingId)
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(
    UploadFileInterceptor(TrainingProperty.VideoFile.Validate, 'videoFile')
  )
  public async update(
    @Param(TrainingParam.TrainingId.name) trainingId: string,
    @Body() dto: UpdateTrainingWithVideoDto,
    @Req() req: Request,
    @UploadedFile() videoFile?: Express.Multer.File
  ) {
    if (req['user']['role'] !== UserRole.Coach) {
      new ForbiddenException(TrainingResponse.ForbiddenUpdate.description);
    }
    if (videoFile) {
      try {
        dto['video'] = await this.uploadFile(videoFile);
      } catch (error) {
        throw new InternalServerErrorException(
          `Не удалось загрузить фото на сервер по причине: ${error.message}`
        );
      }
    }
    dto['coachId'] = req['user']['sub'];
    const responseTraining = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Trainings}/${trainingId}`,
      dto
    );
    responseTraining.data.video = createUrlForFile(
      responseTraining.data.video,
      ApplicationServiceURL.FileServe
    );
    return responseTraining.data;
  }
}
