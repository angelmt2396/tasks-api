import { validationResult } from 'express-validator';
import { ERROR, CODE_400, DATA_VALIDATION_ERROR } from '../utils/constants.js';
export const ValidateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const result = {
      status: ERROR,
      code: CODE_400,
      message: DATA_VALIDATION_ERROR,
      details: errors.array(),
    };
    return res.status(result.code).json(result);
  }
  next();
};
