import { DefaultPort } from '@project/shared-core';

export const ApplicationServiceURL = {
  Api: `http://localhost:${DefaultPort.Api}/api`,
  Users: `http://localhost:${DefaultPort.Users}/api/users`,
  Files: `http://localhost:${DefaultPort.FileVault}/api/files`,
  FileServe: `http://localhost:${DefaultPort.FileVault}/static`,
  Trainings: `http://localhost:${DefaultPort.Trainings}/api/trainings`,
  Orders: `http://localhost:${DefaultPort.Trainings}/api/orders`,
  Friends: `http://localhost:${DefaultPort.Users}/api/friends`,
} as const;

export const ClientConfig = {
  HttpMaxRedirects: 5,
  HttpTimeout: 3000,
  Name: 'Fit Friends',
  Url: 'http://localhost:5000/login',
} as const;
