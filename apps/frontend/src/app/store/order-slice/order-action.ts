import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '@frontend/src/const';

import {
  TrainingMyOrderTotalWithPaginationRdo,
  TrainingMyOrderQuery,
  TrainingOrderWithTraining,
  CreatePurchaseDto,
} from '@project/shared';
import { ApiExtra } from '@frontend/src/types/types';
import { queryToString } from '@frontend/src/utils';

const OrderAction = {
  GetOrders: 'orders/get',
  OrderCreate: 'orders/create',
};

export const getOrders = createAsyncThunk<
  TrainingMyOrderTotalWithPaginationRdo,
  TrainingMyOrderQuery,
  { extra: ApiExtra }
>(OrderAction.GetOrders, async (query, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingMyOrderTotalWithPaginationRdo>(
    `${ApiRoute.Orders}?${queryToString(query)}`
  );
  return data;
});

export const createOrder = createAsyncThunk<
  TrainingOrderWithTraining,
  CreatePurchaseDto,
  { extra: ApiExtra }
>(OrderAction.OrderCreate, async (order, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<TrainingOrderWithTraining>(
    ApiRoute.Orders,
    order
  );
  return data;
});
