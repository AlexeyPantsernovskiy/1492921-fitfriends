import { DefaultPort } from '@project/shared-core';

export const ApplicationServiceURL = {
  Users: `http://localhost:${DefaultPort.Auth}/api/users`,
  Files: `http://localhost:${DefaultPort.FileVault}/api/files`,
  FileServe: `http://localhost:${DefaultPort.FileVault}/static`,
  FitFriends: `http://localhost:${DefaultPort.FitFriends}/api/shop/products`,
} as const;

export const ClientConfig = {
  HttpMaxRedirects: 5,
  HttpTimeout: 3000,
  Name: 'Fit Friends',
  Url: 'http://localhost:5000/login',
} as const;
