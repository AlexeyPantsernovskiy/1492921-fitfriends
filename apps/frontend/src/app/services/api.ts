import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { Token } from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '@frontend/src/const';

import store, { logout } from '@frontend/store';

type DetailMessageType = {
  type: string;
  message: string | string[];
};

type IgnoreErrorMessage = {
  Start?: string;
  End?: string;
  Include?: string;
};

const IgnoreErrorMessages: IgnoreErrorMessage[] = [{ Include: 'Token' }];

const ignoreErrorMessage = (errorMessage: string): boolean =>
  IgnoreErrorMessages.reduce(
    (result, item) =>
      result ||
      (errorMessage.includes(item.Include ?? '') &&
        errorMessage.startsWith(item.Start ?? '') &&
        errorMessage.endsWith(item.End ?? '')),
    false
  );

const StatusCodeMapping = new Set([StatusCodes.UNAUTHORIZED]);

const shouldDisplayError = (response: AxiosResponse) =>
  StatusCodeMapping.has(response.status);

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = Token.getAccessToken() || Token.getRefreshToken();

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (!error.response) {
        toast.error(error.message);
        throw error;
      }

      if (error.response.status === StatusCodes.UNAUTHORIZED) {
        store.dispatch(logout());
      }

      if (!shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        const errorMessage =
          typeof detailMessage.message === 'string'
            ? detailMessage.message
            : detailMessage.message.join('\n\n');

        if (!ignoreErrorMessage(errorMessage)) {
          toast.error(errorMessage, {
            style: { whiteSpace: 'pre-line' },
          });
        }
      }
      throw error;
    }
  );

  return api;
};
