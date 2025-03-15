import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { FillQuestionnaireDto, QuestionnaireRdo } from '@project/shared-core';

import { UserRepository } from './user.repository';
import { UserErrorMessage } from './user.constant';
import { fillDto } from '@project/shared-helpers';

@Injectable()
export class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async fill(
    userId: string,
    dto: FillQuestionnaireDto
  ): Promise<QuestionnaireRdo> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    user.questionnaire = dto;
    const userEntity = await this.userRepository.update(user);
    return fillDto(QuestionnaireRdo, userEntity.questionnaire);
  }

  public async get(userId: string): Promise<QuestionnaireRdo | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    return fillDto(QuestionnaireRdo, user.questionnaire);
  }
}
