import { ValidatorOptions } from 'class-validator';

export const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: false,
  validationError: {
    target: true,
    value: true,
  },
};
