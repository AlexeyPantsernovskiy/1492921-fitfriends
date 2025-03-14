import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, StoreSlice } from '@frontend/src//const';
import { UserProcess } from '@frontend/src/types/state';
import { getUserStatus, loginUser } from './user-action';
import { User } from '@project/shared-core';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userAuth = (state: UserProcess, action: PayloadAction<User>) => {
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.user = action.payload;
};

const userNoAuth = (state: UserProcess) => {
  state.authorizationStatus = AuthorizationStatus.NoAuth;
  state.user = null;
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {
    logout: userNoAuth,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserStatus.fulfilled, userAuth)
      .addCase(getUserStatus.rejected, userNoAuth)
      .addCase(loginUser.fulfilled, userAuth);
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    user: (state) => state.user,
    isLogged: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  },
});
