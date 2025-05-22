import { configureStore } from '@reduxjs/toolkit';

import { createAPI } from '@frontend/src/services/api';
import history from '@frontend/src/history';

import { getUserAuth } from './user-slice/user-action';
import { rootReducer } from './root-reducer';
import { userProcess } from './user-slice/user-process';

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

export { userSelectors } from './user-slice/user-process';
export const { logout } = userProcess.actions;
export { trainingSelectors } from './training-slice/training-process';

export * from './user-slice/user-action';
export * from './training-slice/training-action';
