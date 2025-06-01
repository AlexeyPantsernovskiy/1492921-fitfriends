import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {
  FillQuestionnaireDto,
  QuestionnaireCoachRdo,
  QuestionnaireRdo,
  QuestionnaireUserRdo,
  UserErrorMessage,
  UserRole,
} from '@project/shared-core';

import { UserRepository } from './user.repository';
import { fillDto } from '@project/shared-helpers';

@Injectable()
export class QuestionnaireUserService {
  private readonly logger = new Logger(QuestionnaireUserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async fill(
    userId: string,
    dto: FillQuestionnaireDto
  ): Promise<QuestionnaireRdo> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    if (
      (user.role === UserRole.Sportsman && !dto['duration']) ||
      (user.role === UserRole.Coach && !dto['certificates'])
    ) {
      throw new BadRequestException(UserErrorMessage.QuestionnaireBad);
    }
    user.questionnaire = dto;
    const userEntity = await this.userRepository.update(user);
    return user.role === UserRole.Sportsman
      ? fillDto(QuestionnaireUserRdo, userEntity.questionnaire)
      : fillDto(QuestionnaireCoachRdo, userEntity.questionnaire);
  }

  public async get(userId: string): Promise<QuestionnaireRdo | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    return user.role === UserRole.Sportsman
      ? fillDto(QuestionnaireUserRdo, user.questionnaire)
      : fillDto(QuestionnaireCoachRdo, user.questionnaire);
  }
}
