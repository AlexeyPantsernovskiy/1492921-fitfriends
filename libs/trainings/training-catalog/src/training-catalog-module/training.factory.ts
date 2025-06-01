import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { TrainingEntity } from './training.entity';
import {
  CreateTrainingDto,
  EntityFactory,
  Training,
} from '@project/shared-core';

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  create(entityPlainData: Training): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }

  public static createNewTraining(dto: CreateTrainingDto): TrainingEntity {
    const newTraining = new TrainingEntity();
    newTraining.id = undefined;
    newTraining.name = dto.name;
    newTraining.image = dto.image;
    newTraining.level = dto.level;
    newTraining.specialization = dto.specialization;
    newTraining.duration = dto.duration;
    newTraining.price = dto.price;
    newTraining.calories = dto.calories;
    newTraining.description = dto.description;
    newTraining.sex = dto.sex;
    newTraining.video = dto.video;
    newTraining.coachId = dto.coachId;
    newTraining.isSpecialOffer = dto.isSpecialOffer;
    newTraining.createDate = dayjs().toDate();
    newTraining.rating = 0;

    return newTraining;
  }
}
