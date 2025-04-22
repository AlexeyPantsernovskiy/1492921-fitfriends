import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, StoreSlice } from '@frontend/src//const';
import { UserProcess } from '@frontend/src/types/state';
import {
  Questionnaire,
  QuestionnaireRdo,
  User,
  UserRdo,
} from '@project/shared';

import {
  fillCoachQuestionnaire,
  fillUserQuestionnaire,
  getUserAuth,
  loginUser,
  logoutUser,
  updateUser,
} from './user-action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  saving: false,
};

const userAuth = (state: UserProcess, action: PayloadAction<UserRdo>) => {
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.user = action.payload as User;
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

const setQuestionnaire = (
  state: UserProcess,
  action: PayloadAction<QuestionnaireRdo>
) => {
  if (state.user) {
    state.user.questionnaire = action.payload as Questionnaire;
  }
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
      .addCase(updateUser.rejected, endUpdateUser)

      .addCase(fillUserQuestionnaire.fulfilled, setQuestionnaire)
      .addCase(fillCoachQuestionnaire.fulfilled, setQuestionnaire);
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    user: (state) => state.user,
    isLogged: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
    saving: (state) => state.saving,
  },
});
