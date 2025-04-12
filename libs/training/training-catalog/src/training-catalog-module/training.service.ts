import {
  SpecialForYouQuery,
  Training,
  TrainingQuery,
  TrainingRdo,
  TrainingResponse,
  TrainingWithPaginationRdo,
} from '@project/shared-core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { fillDto } from '@project/shared-helpers';

import { TrainingRepository } from './training.repository';

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
}
