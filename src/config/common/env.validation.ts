import {
  IsEnum,
  IsNotEmpty,
  IsPort,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'lodash';

import { EnvEnum } from '../enums/env.enum';

class EnvValidation {
  @IsNotEmpty()
  @IsEnum(EnvEnum)
  public ENV: string;

  @IsNotEmpty()
  @IsString()
  public BACKEND_HOST: string;

  @IsNotEmpty()
  @IsPort()
  public BACKEND_PORT: string;

  @IsNotEmpty()
  @IsString()
  public POSTGRES_HOST: string;

  @IsNotEmpty()
  @IsPort()
  public POSTGRES_PORT: string;

  @IsNotEmpty()
  @IsString()
  public POSTGRES_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  public POSTGRES_USER: string;

  @IsNotEmpty()
  @IsString()
  public POSTGRES_PASSWORD: string;
}

export const validateEnv = (config: Record<string, unknown>): EnvValidation => {
  const validatedConfig: EnvValidation = plainToClass(EnvValidation, config, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (!isEmpty(errors)) throw new Error(errors.toString());

  return validatedConfig;
};
