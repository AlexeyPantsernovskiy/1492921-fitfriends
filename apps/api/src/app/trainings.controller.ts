import 'multer';
import * as url from 'node:url';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import qs from 'qs';

import {
  CommonResponse,
  LimitQuery,
  SpecialForYouQuery,
  TrainingOperation,
  TrainingParam,
  TrainingQuery,
  TrainingResponse,
  UserRdo,
} from '@project/shared-core';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { createUrlForFile } from '@project/shared-helpers';
import { CheckAuthGuard } from './guards/check-auth.guard';


@ApiTags('Trainings')
@Controller('trainings')
@UseFilters(AxiosExceptionFilter)
export class TrainingsController {
  constructor(private readonly httpService: HttpService) {}

  @Get('')
  @ApiOperation(TrainingOperation.Catalog)
  @ApiResponse(TrainingResponse.Trainings)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async catalog(@Query() query: TrainingQuery, @Req() req: Request) {
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
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async specialForYou(@Query() queryLimit: LimitQuery, @Req() req: Request) {
    const responseUser = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${req['user']['sub']}`,
      {}
    );
    const user:UserRdo = responseUser.data;
    const query:SpecialForYouQuery = {
      ...queryLimit,
      specializations: user.questionnaire.specialization,
      sex: user.sex,
      level: user.questionnaire.level,
      duration: user.questionnaire.duration,
      calories: user.questionnaire.caloriesWaste
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
          userResponse.data.avatar,
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
      console.error(
        `Не удалось найти тренера (id = ${response.data.coachId}) для тренировки ${response.data.id}:`,
        error
      );
    }

    return response.data;
  }
}
