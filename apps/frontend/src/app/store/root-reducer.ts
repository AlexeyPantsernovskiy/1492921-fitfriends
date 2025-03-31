import { combineReducers } from '@reduxjs/toolkit';

import { siteProcess } from './site-process/site-process';
import { userProcess } from './user-slice/user-process';
import { StoreSlice } from '../const';
import { trainingProcess } from './training-slice/training-process';

export const rootReducer = combineReducers({
  [StoreSlice.TrainingProcess]: trainingProcess.reducer,
  [StoreSlice.UserProcess]: userProcess.reducer,
  [StoreSlice.SiteProcess]: siteProcess.reducer,
});
