import { combineReducers } from '@reduxjs/toolkit';

import { siteProcess } from './site-process/site-process';
import { userProcess } from './user-slice/user-process';
import { StoreSlice } from '../const';

export const rootReducer = combineReducers({
  [StoreSlice.SiteProcess]: siteProcess.reducer,
  [StoreSlice.UserProcess]: userProcess.reducer,
});
