import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CommonResponse,
  CreateTrainingDto,
  SpecialForYouQuery,
  TrainingOperation,
  TrainingParam,
  TrainingQuery,
  TrainingResponse,
  UpdateTrainingDto,
} from '@project/shared-core';

import { TrainingService } from './training.service';

@ApiTags('Тренировки')
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get('')
  @ApiOperation(TrainingOperation.Trainings)
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

  @Post('')
  @ApiOperation(TrainingOperation.Create)
  @ApiResponse(TrainingResponse.TrainingCreated)
  @ApiResponse(CommonResponse.BadRequest)
  public async create(@Body() dto: CreateTrainingDto) {
    return await this.trainingService.createTraining(dto);
  }

  @Patch(':trainingId')
  @ApiOperation(TrainingOperation.Update)
  @ApiResponse(TrainingResponse.TrainingUpdating)
  @ApiResponse(TrainingResponse.ForbiddenUpdate)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(TrainingParam.TrainingId)
  public async update(
    @Param('trainingId') trainingId: number,
    @Body() dto: UpdateTrainingDto
  ) {
    return await this.trainingService.updateTraining(trainingId, dto);
  }
}
