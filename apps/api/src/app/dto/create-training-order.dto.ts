import { OmitType } from '@nestjs/swagger';

import { CreateOrderDto } from '@project/shared-core';

export class CreateTrainingOrderDto extends OmitType(CreateOrderDto, [
  'userId',
]) {}
