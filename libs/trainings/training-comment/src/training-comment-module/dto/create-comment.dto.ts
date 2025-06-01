import { ICreateCommentDto } from '@project/shared-core';
import { OmitType } from '@nestjs/swagger';
import { BaseCommentDto } from './base-comment.dto';

export class CreateCommentDto
  extends OmitType(BaseCommentDto, ['id'])
  implements ICreateCommentDto {}
