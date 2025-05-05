import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as url from 'node:url';

import {
  CommonResponse,
  TrainingOperation,
  TrainingOrderQuery,
  TrainingOrderRdo,
  TrainingOrderResponse,
  TrainingRdo,
  UserResponse,
  UserRole,
} from '@project/shared-core';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from './interceptors/inject-user-id.interceptor';
import { CreateTrainingOrderDto } from './dto/create-training-order.dto';
import { UpdateTrainingOrderStateDto } from './dto/update-training-order-state.dto';

@ApiTags('Заказы (покупки)')
@Controller('orders')
@UseFilters(AxiosExceptionFilter)
export class OrderController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation(TrainingOperation.CreateOrder)
  @ApiResponse(TrainingOrderResponse.OrderCreated)
  @ApiResponse(TrainingOrderResponse.ForbiddenCreate)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  @Post('')
  public async create(
    @Body() dto: CreateTrainingOrderDto,
    @Req() req: Request
  ) {
    const userId = req['user']?.sub;
    const userRole = req['user']?.role;
    if (userRole === UserRole.Coach) {
      new ForbiddenException(TrainingOrderResponse.ForbiddenCreate.description);
    }
    dto['userId'] = userId;
    const { data: newOrder } =
      await this.httpService.axiosRef.post<TrainingOrderRdo>(
        ApplicationServiceURL.Orders,
        dto
      );

    const { data: training } = await this.httpService.axiosRef.get<TrainingRdo>(
      `${ApplicationServiceURL.Api}/trainings/${dto.trainingId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return { ...newOrder, training };
  }

  @ApiOperation(TrainingOperation.Orders)
  @ApiResponse(TrainingOrderResponse.Orders)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @Get('')
  public async show(@Query() query: TrainingOrderQuery, @Req() req: Request) {
    const userId = req['user']?.sub;
    const userRole = req['user']?.role;
    if (query.role) {
      new BadRequestException('Параметр role запрещено указывать в запросе');
    }
    if (query.userId) {
      new BadRequestException('Параметр userId запрещено указывать в запросе');
    }
    const queryString = url.parse(req.url).query;
    const { data: orders } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Orders}${userRole === UserRole.Coach ? '/total' : ''}?${queryString}&userId=${userId}`,
      {}
    );

    const ordersWithTraining = await Promise.all(
      orders.entities.map(async (order) => {
        const { data: training } = await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Api}/trainings/${order.trainingId}`,
          {
            headers: {
              Authorization: req.headers['authorization'],
            },
          }
        );
        delete order.trainingId;
        return {
          ...order,
          training,
        };
      })
    );

    return { ...orders, entities: ordersWithTraining };
  }

  @ApiOperation(TrainingOperation.UpdateOrderState)
  @ApiResponse(TrainingOrderResponse.OrderUpdating)
  @ApiResponse(TrainingOrderResponse.ForbiddenUpdate)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(UserResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @Put('')
  public async updateTrainingState(
    @Body() dto: UpdateTrainingOrderStateDto,
    @Req() req: Request
  ) {
    const userId = req['user']?.sub;
    if (dto['userId']) {
      new BadRequestException('В теле запроса не должно быть поля userId');
    }
    dto['userId'] = userId;
    const { data: order } =
      await this.httpService.axiosRef.put<TrainingOrderRdo>(
        `${ApplicationServiceURL.Orders}`,
        dto
      );

    const { data: training } = await this.httpService.axiosRef.get<TrainingRdo>(
      `${ApplicationServiceURL.Api}/trainings/${dto.trainingId}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return { ...order, training };
  }
}
