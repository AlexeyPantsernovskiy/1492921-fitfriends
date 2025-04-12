import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute, AppRoute } from '@frontend/src/const';
import { Token } from '@frontend/src/services/token';
import {
  UserToken,
  UserLogin,
  UserRdo,
  LoggedUserRdo,
  Questionnaire,
  QuestionnaireUserRdo,
  UserRole,
  TokenPayloadRdo,
} from '@project/shared';
import { ApiExtra } from '@frontend/src/types/types';

const UserAction = {
  LoginUser: 'user/login',
  LogoutUser: 'user/logout',
  GetUserStatus: 'user/check-auth',
  GetUser: 'user/get',
  RegisterUser: 'user/register',
  FillQuestionnaire: 'user/fill-questionnaire',
  GetQuestionnaire: 'user/get-questionnaire',
  UpdateUser: 'user/update',
};

export const getUserAuth = createAsyncThunk<
  UserRdo,
  undefined,
  { extra: ApiExtra }
>(UserAction.GetUserStatus, async (_arg, { extra }) => {
  const { api } = extra;
  let tokenPayload: TokenPayloadRdo;

  const refreshAccessToken = async (): Promise<UserToken> => {
    const { data } = await api.post<UserToken>(ApiRoute.TokenRefresh);
    return data;
  };

  try {
    // Попытка выполнить основной запрос
    const { data } = await api.post<TokenPayloadRdo>(ApiRoute.UserCheckAuth);
    tokenPayload = data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
      Token.drop();
      try {
        // Если запрос вернул UNAUTHORIZED, пытаемся обновить токен
        const token = await refreshAccessToken();
        Token.save(token);

        // Повторяем основной запрос с новым токеном
        const { data } = await api.post<TokenPayloadRdo>(
          ApiRoute.UserCheckAuth
        );
        tokenPayload = data;
      } catch (refreshError) {
        // Если обновление токена не удалось, отклоняем промис с ошибкой
        return Promise.reject(refreshError);
      }
    }
    // Если ошибка не связана с авторизацией, отклоняем промис с оригинальной ошибкой
    return Promise.reject(error);
  }
  // При удачной авторизации запрашиваем данные об авторизованном пользователе
  const { data } = await api.get<UserRdo>(
    ApiRoute.UserGetInfo.replace(':userId', tokenPayload.sub)
  );
  return data;
});

export const getUser = createAsyncThunk<UserRdo, string, { extra: ApiExtra }>(
  UserAction.GetUser,
  async (userId, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<UserRdo>(
      ApiRoute.UserGetInfo.replace(':userId', userId)
    );
    return data;
  }
);

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  { extra: ApiExtra }
>(UserAction.LogoutUser, async (_arg, { extra }) => {
  //const { api, history } = extra;
  //await api.delete(ApiRoute.UserLogout);
  const { history } = extra;
  Token.drop();
  history.push(AppRoute.Intro);
});

export const registerUser = createAsyncThunk<
  void,
  FormData,
  { extra: ApiExtra }
>(UserAction.RegisterUser, async (user, { extra }) => {
  const { api, history } = extra;

  const { data } = await api.post<UserRdo>(ApiRoute.UserRegister, user);
  const userId = data.id;
  const role = data.role;
  if (role === UserRole.Sportsman) {
    history.push(AppRoute.QuestionnaireUser.replace(':userId', userId));
  }
});

export const fillQuestionnaire = createAsyncThunk<
  void,
  { userId: string; questionnaire: Questionnaire },
  { extra: ApiExtra }
>(
  UserAction.FillQuestionnaire,
  async ({ userId, questionnaire }, { extra }) => {
    const { api, history } = extra;
    await api.put<QuestionnaireUserRdo>(
      ApiRoute.Questionnaire.replace(':userId', userId),
      questionnaire
    );
    history.push(AppRoute.Login);
  }
);

export const getQuestionnaire = createAsyncThunk<
  QuestionnaireUserRdo,
  string,
  { extra: ApiExtra }
>(UserAction.GetQuestionnaire, async (userId, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<QuestionnaireUserRdo>(
    ApiRoute.Questionnaire.replace(':userId', userId)
  );
  return data;
});

export const loginUser = createAsyncThunk<
  UserRdo,
  UserLogin,
  { extra: ApiExtra }
>(UserAction.LoginUser, async (login, { extra }) => {
  const { api, history } = extra;

  const { data } = await api.post<LoggedUserRdo>(ApiRoute.UserLogin, login);
  const { accessToken, refreshToken, ...user } = data;

  Token.save({ accessToken, refreshToken });
  history.push(AppRoute.Catalog);

  return user;
});

export const updateUser = createAsyncThunk<
  UserRdo,
  FormData,
  { extra: ApiExtra }
>(UserAction.UpdateUser, async (formData, { extra }) => {
  const { api } = extra;
  const { data } = await api.patch<LoggedUserRdo>(
    ApiRoute.UserUpdate,
    formData
  );
  return data;
});
