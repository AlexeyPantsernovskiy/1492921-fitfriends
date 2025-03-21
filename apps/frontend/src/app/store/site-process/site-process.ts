import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StoreSlice } from '@frontend/src/const';
import { SiteProcess } from '@frontend/src/types/state';
import { SortType } from '@project/shared';

const initialState: SiteProcess = {
  sorting: SortType.CreateDate,
};

export const siteProcess = createSlice({
  name: StoreSlice.SiteProcess,
  initialState,
  reducers: {
    setSorting: (state, action: PayloadAction<SortType>) => {
      state.sorting = action.payload;
    },
  },
  selectors: {
    sorting: (state) => state.sorting,
  },
});
