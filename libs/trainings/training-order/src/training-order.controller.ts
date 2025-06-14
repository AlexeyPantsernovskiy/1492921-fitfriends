import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CommonResponse,
  CreateOrderDto,
  TrainingOperation,
  TrainingOrderQuery,
  TrainingOrderResponse,
  UserRole,
} from '@project/shared-core';

import { TrainingOrderService } from './training-order.service';

@ApiTags('Заказы (покупки)')
@Controller('orders')
export class TrainingOrderController {
  constructor(private readonly trainingOrderService: TrainingOrderService) {}

  @ApiOperation(TrainingOperation.CreateOrder)
  @ApiResponse(TrainingOrderResponse.OrderCreated)
  @ApiResponse(TrainingOrderResponse.ForbiddenCreate)
  @ApiResponse(CommonResponse.BadRequest)
  @Post('')
  public async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.trainingOrderService.createOrder(dto);
    return newOrder;
  }

  @ApiOperation(TrainingOperation.OrdersTotal)
  @ApiResponse(TrainingOrderResponse.OrdersTotal)
  @ApiResponse(CommonResponse.BadRequest)
  @Get('total')
  public async showTotal(@Query() query: TrainingOrderQuery) {
    return await this.trainingOrderService.getOrdersTotal(query);
  }

  @ApiOperation(TrainingOperation.Orders)
  @ApiResponse(TrainingOrderResponse.Orders)
  @ApiResponse(CommonResponse.BadRequest)
  @Get('')
  public async show(@Query() query: TrainingOrderQuery) {
    const orders =
      query.role === UserRole.Coach
        ? await this.trainingOrderService.getOrdersTotal(query)
        : await this.trainingOrderService.getOrders(query);
    return orders;
  }
}
