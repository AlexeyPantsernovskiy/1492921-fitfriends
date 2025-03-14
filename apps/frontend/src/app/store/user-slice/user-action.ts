import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ApiRoute, AppRoute } from '@frontend/src/const';
import { Token } from '@frontend/src/services/token';
import {
  UserToken,
  UserLogin,
  UserRdo,
  UserRegister,
  LoggedUserRdo,
} from '@project/shared-core';
import { ApiExtra } from '@frontend/src/types/types';

export const UserAction = {
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  GET_USER_STATUS: 'user/check-auth',
  REGISTER_USER: 'user/register',
};

export const getUserStatus = createAsyncThunk<
  UserRdo,
  undefined,
  { extra: ApiExtra }
>(UserAction.GET_USER_STATUS, async (_arg, { extra }) => {
  const { api } = extra;

  const refreshAccessToken = async (): Promise<UserToken> => {
    const { data } = await api.post<UserToken>(ApiRoute.TokenRefresh);
    return data;
  };

  try {
    // Попытка выполнить основной запрос
    const { data } = await api.post<UserRdo>(ApiRoute.UserCheckAuth);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
      Token.drop();
      try {
        // Если запрос вернул UNAUTHORIZED, пытаемся обновить токен
        const token = await refreshAccessToken();
        Token.save(token);

        // Повторяем основной запрос с новым токеном
        const { data } = await api.post<UserRdo>(ApiRoute.UserCheckAuth);
        return data;
      } catch (refreshError) {
        // Если обновление токена не удалось, отклоняем промис с ошибкой
        return Promise.reject(refreshError);
      }
    }

    // Если ошибка не связана с авторизацией, отклоняем промис с оригинальной ошибкой
    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<
  UserRdo,
  UserLogin,
  { extra: ApiExtra }
>(UserAction.LOGIN_USER, async (login, { extra }) => {
  const { api, history } = extra;

  const { data } = await api.post<LoggedUserRdo>(ApiRoute.UserLogin, login);
  const { accessToken, refreshToken, ...user } = data;

  Token.save({ accessToken, refreshToken });
  history.push(AppRoute.Catalog);

  return user;
});

export const registerUser = createAsyncThunk<
  void,
  UserRegister,
  { extra: ApiExtra }
>(UserAction.REGISTER_USER, async (user, { extra }) => {
  const { api, history } = extra;

  await api.post<UserRdo>(ApiRoute.UserRegister, user);
  history.push(AppRoute.Questionnaire);
});
