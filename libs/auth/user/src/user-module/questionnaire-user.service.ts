import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import {
  FillQuestionnaireUserDto,
  QuestionnaireUserRdo,
} from '@project/shared-core';

import { UserRepository } from './user.repository';
import { UserErrorMessage } from './user.constant';
import { fillDto } from '@project/shared-helpers';

@Injectable()
export class QuestionnaireUserService {
  private readonly logger = new Logger(QuestionnaireUserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async fill(
    userId: string,
    dto: FillQuestionnaireUserDto
  ): Promise<QuestionnaireUserRdo> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    user.questionnaire = dto;
    const userEntity = await this.userRepository.update(user);
    return fillDto(QuestionnaireUserRdo, userEntity.questionnaire);
  }

  public async get(userId: string): Promise<QuestionnaireUserRdo | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(UserErrorMessage.UserNotFound);
    }
    return fillDto(QuestionnaireUserRdo, user.questionnaire);
  }
}
