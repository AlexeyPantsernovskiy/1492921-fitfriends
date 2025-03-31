import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, StoreSlice } from '@frontend/src//const';
import { UserProcess } from '@frontend/src/types/state';
import { User } from '@project/shared';

import { getUserAuth, loginUser, logoutUser, updateUser } from './user-action';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  saving: false,
};

const userAuth = (state: UserProcess, action: PayloadAction<User>) => {
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.user = action.payload;
  state.saving = false;
};

const userNoAuth = (state: UserProcess) => {
  state.authorizationStatus = AuthorizationStatus.NoAuth;
  state.user = null;
  state.saving = false;
};

const startUpdateUser = (state: UserProcess) => {
  state.saving = true;
};

const endUpdateUser = (state: UserProcess) => {
  state.saving = false;
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {
    logout: userNoAuth,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserAuth.fulfilled, userAuth)
      .addCase(getUserAuth.rejected, userNoAuth)

      .addCase(loginUser.fulfilled, userAuth)

      .addCase(logoutUser.fulfilled, userNoAuth)

      .addCase(updateUser.pending, startUpdateUser)
      .addCase(updateUser.fulfilled, userAuth)
      .addCase(updateUser.rejected, endUpdateUser);
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    user: (state) => state.user,
    isLogged: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
    saving: (state) => state.saving,
  },
});
