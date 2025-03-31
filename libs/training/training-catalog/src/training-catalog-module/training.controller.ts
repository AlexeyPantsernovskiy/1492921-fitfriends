import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import {
  CommonResponse,
  SpecialForYouQuery,
  TrainingOperation,
  TrainingParam,
  TrainingQuery,
  TrainingResponse,
} from '@project/shared-core';

import { TrainingService } from './training.service';

@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get('')
  @ApiOperation(TrainingOperation.Catalog)
  @ApiResponse(TrainingResponse.Trainings)
  @ApiResponse(CommonResponse.BadRequest)
  public async catalog(@Query() query: TrainingQuery) {
    return await this.trainingService.getTrainings(query);
  }

  @Get('special-for-you')
  @ApiOperation(TrainingOperation.SpecialForYou)
  @ApiResponse(TrainingResponse.Trainings)
  @ApiResponse(CommonResponse.BadRequest)
  public async specialForYou(@Query() query: SpecialForYouQuery) {
    return await this.trainingService.getTrainingsSpecialForYou(query);
  }

  @Get(':trainingId')
  @ApiOperation(TrainingOperation.View)
  @ApiResponse(TrainingResponse.TrainingFound)
  @ApiResponse(TrainingResponse.TrainingNotFound)
  @ApiParam(TrainingParam.TrainingId)
  public async show(@Param('trainingId') trainingId: number) {
    return await this.trainingService.getTraining(trainingId);
  }
}
