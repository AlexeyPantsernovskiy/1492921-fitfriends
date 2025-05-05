import { OmitType } from '@nestjs/swagger';

import { UpdateOrderStateDto } from '@project/shared-core';

export class UpdateTrainingOrderStateDto extends OmitType(UpdateOrderStateDto, [
  'userId',
]) {}
