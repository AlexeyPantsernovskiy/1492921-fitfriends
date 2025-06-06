import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { DefaultPort } from '@project/shared-core';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Evironment = (typeof ENVIRONMENTS)[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...ENVIRONMENTS)
    .required(),
  port: Joi.number().port().default(DefaultPort.Trainings),
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config validation error] ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Evironment,
    port: parseInt(process.env.PORT || `${DefaultPort.Trainings}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
