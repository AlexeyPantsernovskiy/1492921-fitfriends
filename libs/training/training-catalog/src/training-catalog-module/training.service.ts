import {
  CreateTrainingDto,
  SpecialForYouQuery,
  Training,
  TrainingErrorMessage,
  TrainingQuery,
  TrainingRdo,
  TrainingResponse,
  TrainingWithPaginationRdo,
  UpdateTrainingDto,
} from '@project/shared-core';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { fillDto } from '@project/shared-helpers';

import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';

@Injectable()
export class TrainingService {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  public async getTraining(id: Training['id']): Promise<TrainingRdo> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new NotFoundException(TrainingResponse.TrainingNotFound);
    }
    return fillDto(TrainingRdo, existTraining.toPOJO());
  }

  public async getTrainings(
    query?: TrainingQuery
  ): Promise<TrainingWithPaginationRdo | null> {
    const trainingsWithPagination = await this.trainingRepository.find(query);
    return {
      ...trainingsWithPagination,
      entities: trainingsWithPagination.entities.map((item) => item.toPOJO()),
    };
  }

  public async getTrainingsSpecialForYou(
    query: SpecialForYouQuery
  ): Promise<TrainingRdo[] | null> {
    const trainings = await this.trainingRepository.findSpecialForYou(query);
    return trainings.map((item) => fillDto(TrainingRdo, item));
  }

  public async createTraining(dto: CreateTrainingDto): Promise<TrainingRdo> {
    const newTraining = TrainingFactory.createNewTraining(dto);
    const record = await this.trainingRepository.insert(newTraining);
    return fillDto(TrainingRdo, record.toPOJO());
  }

  public async updateTraining(
    id: number,
    dto: UpdateTrainingDto
  ): Promise<TrainingRdo> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new NotFoundException(TrainingResponse.TrainingNotFound);
    }
    if (dto.coachId && dto.coachId !== existTraining.coachId) {
      throw new ForbiddenException(TrainingErrorMessage.ChangeCoach);
    }
    if (dto['id']) {
      throw new BadRequestException('Поле ID не должно быть в теле запроса');
    }
    for (const [key, value] of Object.entries(dto)) {
      if (value && value !== undefined && existTraining[key] !== value) {
        existTraining[key] = value;
      }
    }
    const record = await this.trainingRepository.update(existTraining);
    return fillDto(TrainingRdo, record.toPOJO());
  }
}
