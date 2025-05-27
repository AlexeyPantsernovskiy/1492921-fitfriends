import { OmitType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class CreatePurchaseDto extends OmitType(CreateOrderDto, ['userId']) {}
