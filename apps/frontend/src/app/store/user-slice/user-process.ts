import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { AuthorizationStatus, StoreSlice } from '@frontend/src//const';
import { UserProcess } from '@frontend/src/types/state';
import {
  CoachQuestionnaire,
  Questionnaire,
  QuestionnaireRdo,
  User,
  UserRdo,
  UserRole,
} from '@project/shared';

import {
  addCertificate,
  deleteCertificate,
  fillCoachQuestionnaire,
  fillUserQuestionnaire,
  getUserAuth,
  loginUser,
  logoutUser,
  updateCertificate,
  updateUser,
} from './user-action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userAuth = (state: UserProcess, action: PayloadAction<UserRdo>) => {
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.user = action.payload as User;
};

const userNoAuth = (state: UserProcess) => {
  state.authorizationStatus = AuthorizationStatus.NoAuth;
  state.user = null;
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
      .addCase(updateUser.fulfilled, userAuth)

      .addCase(fillUserQuestionnaire.fulfilled, setQuestionnaire)
      .addCase(fillCoachQuestionnaire.fulfilled, setQuestionnaire)

      .addCase(addCertificate.fulfilled, setQuestionnaire)
      .addCase(updateCertificate.fulfilled, setQuestionnaire)
      .addCase(deleteCertificate.fulfilled, setQuestionnaire);
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    user: (state) => state.user,
    isLogged: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
  },
});

export const userSelectors = {
  ...userProcess.selectors,
  questionnaireCoach: createSelector(userProcess.selectors.user, (user) =>
    user?.role === UserRole.Coach
      ? (user?.questionnaire as CoachQuestionnaire)
      : null
  ),
  certificates: createSelector(userProcess.selectors.user, (user) =>
    user?.role === UserRole.Coach
      ? (user.questionnaire as CoachQuestionnaire).certificates
      : []
  ),
};
