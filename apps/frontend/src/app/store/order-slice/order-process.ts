import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StoreSlice } from '@frontend/src/const';
import { OrderProcess } from '@frontend/src/types/state';
import { TrainingMyOrderTotalWithPaginationRdo } from '@project/shared';

import { createOrder, getOrders } from './order-action';

const initialState: OrderProcess = {
  orders: null,
  isOrdersLoading: false,
  isOrderSaving: false,
};

const endLoadingOrders = (
  state: OrderProcess,
  action: PayloadAction<TrainingMyOrderTotalWithPaginationRdo>
) => {
  state.orders = action.payload;
  state.isOrdersLoading = false;
};

const startLoadingOrders = (state: OrderProcess) => {
  state.isOrdersLoading = true;
};

const errorLoadingOrders = (state: OrderProcess) => {
  state.isOrdersLoading = false;
};

const startSavingOrder = (state: OrderProcess) => {
  state.isOrderSaving = true;
};

const endSavingOrder = (state: OrderProcess) => {
  state.isOrderSaving = false;
};
const errorSavingOrder = (state: OrderProcess) => {
  state.isOrderSaving = false;
};

export const orderProcess = createSlice({
  name: StoreSlice.OrderProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, startLoadingOrders)
      .addCase(getOrders.fulfilled, endLoadingOrders)
      .addCase(getOrders.rejected, errorLoadingOrders)

      .addCase(createOrder.pending, startSavingOrder)
      .addCase(createOrder.fulfilled, endSavingOrder)
      .addCase(createOrder.rejected, errorSavingOrder);
  },
  selectors: {
    isOrdersLoading: (state) => state.isOrdersLoading,
    orders: (state) => state.orders,
    isOrderSaving: (state) => state.isOrderSaving,
  },
});

export const orderSelectors = orderProcess.selectors;
