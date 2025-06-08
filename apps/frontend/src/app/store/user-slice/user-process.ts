import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { AuthorizationStatus, StoreSlice } from '@frontend/src//const';
import { UserProcess } from '@frontend/src/types/state';
import {
  CoachQuestionnaire,
  FriendWithPaginationRdo,
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
  getLookForCompany,
  getUserAuth,
  loginUser,
  logoutUser,
  updateCertificate,
  updateUser,
  getUser,
  addFriend,
  deleteFriend,
  getFriends,
} from './user-action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoading: false,
  userAuth: null,
  user: null,
  users: null,
  friends: null,
};

const userAuth = (state: UserProcess, action: PayloadAction<UserRdo>) => {
  state.authorizationStatus = AuthorizationStatus.Auth;
  state.userAuth = action.payload as User;
};

const userNoAuth = (state: UserProcess) => {
  state.authorizationStatus = AuthorizationStatus.NoAuth;
  state.userAuth = null;
};

const setQuestionnaire = (
  state: UserProcess,
  action: PayloadAction<QuestionnaireRdo>
) => {
  if (state.userAuth) {
    state.userAuth.questionnaire = action.payload as Questionnaire;
  }
};

const endLoadingUsers = (state: UserProcess, action: PayloadAction<User[]>) => {
  state.users = action.payload;
  state.isLoading = false;
};

const startLoading = (state: UserProcess) => {
  state.isLoading = true;
};

const errorLoading = (state: UserProcess) => {
  state.isLoading = false;
};

const endLoadingUser = (state: UserProcess, action: PayloadAction<UserRdo>) => {
  state.user = action.payload;
  state.isLoading = false;
};

const endAddFriend = (state: UserProcess) => {
  if (state.user) {
    state.user.isFriend = true;
  }
};

const endDeleteFriend = (state: UserProcess) => {
  if (state.user) {
    state.user.isFriend = false;
  }
};

const endLoadingFriends = (
  state: UserProcess,
  action: PayloadAction<FriendWithPaginationRdo>
) => {
  state.friends = action.payload;
  state.isLoading = false;
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
      .addCase(deleteCertificate.fulfilled, setQuestionnaire)

      .addCase(getLookForCompany.pending, startLoading)
      .addCase(getLookForCompany.fulfilled, endLoadingUsers)
      .addCase(getLookForCompany.rejected, errorLoading)

      .addCase(getUser.pending, startLoading)
      .addCase(getUser.fulfilled, endLoadingUser)
      .addCase(getUser.rejected, errorLoading)

      .addCase(deleteFriend.fulfilled, endDeleteFriend)
      .addCase(addFriend.fulfilled, endAddFriend)

      .addCase(getFriends.pending, startLoading)
      .addCase(getFriends.fulfilled, endLoadingFriends)
      .addCase(getFriends.rejected, errorLoading);
  },
  selectors: {
    authorizationStatus: (state) => state.authorizationStatus,
    userAuth: (state) => state.userAuth,
    isLogged: (state) => state.authorizationStatus === AuthorizationStatus.Auth,
    users: (state) => state.users,
    isLoading: (state) => state.isLoading,
    user: (state) => state.user,
    friends: (state) => state.friends,
  },
});

export const userSelectors = {
  ...userProcess.selectors,
  questionnaireCoach: createSelector(userProcess.selectors.userAuth, (user) =>
    user?.role === UserRole.Coach
      ? (user?.questionnaire as CoachQuestionnaire)
      : null
  ),
  certificates: createSelector(userProcess.selectors.userAuth, (user) =>
    user?.role === UserRole.Coach
      ? (user.questionnaire as CoachQuestionnaire).certificates
      : []
  ),
};
