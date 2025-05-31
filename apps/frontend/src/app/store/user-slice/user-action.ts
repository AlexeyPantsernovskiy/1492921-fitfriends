import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '@frontend/src/const';
import { Token } from '@frontend/src/services/token';
import {
  UserToken,
  UserLogin,
  UserRdo,
  LoggedUserRdo,
  QuestionnaireUserRdo,
  TokenPayloadRdo,
  UserQuestionnaire,
  QuestionnaireCoachRdo,
  User,
} from '@project/shared';
import { ApiExtra } from '@frontend/src/types/types';

const UserAction = {
  LoginUser: 'user/login',
  LogoutUser: 'user/logout',
  GetUserStatus: 'user/check-auth',
  GetUser: 'user/get',
  RegisterUser: 'user/register',
  FillUserQuestionnaire: 'user/fill-user-questionnaire',
  FillCoachQuestionnaire: 'user/fill-coach-questionnaire',
  GetQuestionnaire: 'user/get-questionnaire',
  UpdateUser: 'user/update',
  AddCertificate: 'user/add-certificate',
  UpdateCertificate: 'user/update-certificate',
  DeleteCertificate: 'user/delete-certificate',
  ReadyToTrain: 'user/ready-to-train',
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

export const logoutUser = createAsyncThunk<void, undefined>(
  UserAction.LogoutUser,
  async () => {
    Token.drop();
  }
);

export const registerUser = createAsyncThunk<
  void,
  FormData,
  { extra: ApiExtra }
>(UserAction.RegisterUser, async (user, { extra }) => {
  const { api } = extra;
  await api.post<UserRdo>(ApiRoute.UserRegister, user);
});

export const fillUserQuestionnaire = createAsyncThunk<
  QuestionnaireUserRdo,
  UserQuestionnaire,
  { extra: ApiExtra }
>(UserAction.FillUserQuestionnaire, async (questionnaire, { extra }) => {
  const { api } = extra;
  const response = await api.put<QuestionnaireUserRdo>(
    ApiRoute.QuestionnaireUser,
    questionnaire
  );
  return response.data;
});

export const fillCoachQuestionnaire = createAsyncThunk<
  QuestionnaireCoachRdo,
  FormData,
  { extra: ApiExtra }
>(UserAction.FillCoachQuestionnaire, async (formData, { extra }) => {
  const { api } = extra;
  const { data } = await api.put<QuestionnaireCoachRdo>(
    ApiRoute.QuestionnaireCoach,
    formData
  );
  return data;
});

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
  const { api } = extra;
  const { data } = await api.post<LoggedUserRdo>(ApiRoute.UserLogin, login);
  const { accessToken, refreshToken, ...user } = data;
  Token.save({ accessToken, refreshToken });
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

export const addCertificate = createAsyncThunk<
  QuestionnaireCoachRdo,
  FormData,
  { extra: ApiExtra }
>(UserAction.AddCertificate, async (formData, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<QuestionnaireCoachRdo>(
    ApiRoute.UpdateCertificates,
    formData
  );
  return data;
});

export const updateCertificate = createAsyncThunk<
  QuestionnaireCoachRdo,
  { indexCertificate: number; formData: FormData },
  { extra: ApiExtra }
>(
  UserAction.UpdateCertificate,
  async ({ indexCertificate, formData }, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<QuestionnaireCoachRdo>(
      `${ApiRoute.UpdateCertificates}/${indexCertificate}`,
      formData
    );
    return data;
  }
);

export const deleteCertificate = createAsyncThunk<
  QuestionnaireCoachRdo,
  number,
  { extra: ApiExtra }
>(UserAction.DeleteCertificate, async (indexCertificate, { extra }) => {
  const { api } = extra;
  const { data } = await api.delete<QuestionnaireCoachRdo>(
    `${ApiRoute.UpdateCertificates}/${indexCertificate}`
  );
  return data;
});

export const getUsersReadyToTrain = createAsyncThunk<
  User[],
  number,
  { extra: ApiExtra }
>(UserAction.ReadyToTrain, async (limit, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<User[]>(
    `${ApiRoute.UsersReadyToTrain}?limit=${limit}`
  );
  return data;
});
