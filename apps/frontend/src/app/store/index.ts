import { configureStore } from '@reduxjs/toolkit';

import { getUserAuth } from './user-slice/user-action';
import { rootReducer } from './root-reducer';
import { createAPI } from '@frontend/src/services/api';
import history from '@frontend/src/history';
import { userProcess } from './user-slice/user-process';
import { siteProcess } from './site-process/site-process';

const api = createAPI();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api,
          history,
        },
      },
    }),
});

store.dispatch(getUserAuth());

export default store;

export const userSelectors = userProcess.selectors;
export const { logout } = userProcess.actions;
export const { setSorting } = siteProcess.actions;
export const getSorting = siteProcess.selectors.sorting;

export * from './user-slice/user-action';
