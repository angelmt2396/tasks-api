import {
  CODE_201,
  CODE_404,
  SUCCESS,
  MESSAGE_CREATE_SUCCESS,
  CODE_200,
  MESSAGE_UPDATE_SUCCESS,
  MESSAGE_DELETE_SUCCESS,
  MESSAGE_SEARCH_SUCCESS,
  ERROR,
  DATA_NOT_FOUND,
  CODE_400,
  DATA_VALIDATION_ERROR,
} from './constants.js';
import { validateEndDateGreater } from './validations-request-params.js';
export const responses = {
  success: {
    create: {
      status: SUCCESS,
      code: CODE_201,
      message: MESSAGE_CREATE_SUCCESS,
    },
    update: {
      status: SUCCESS,
      code: CODE_200,
      message: MESSAGE_UPDATE_SUCCESS,
    },
    delete: {
      status: SUCCESS,
      code: CODE_200,
      message: MESSAGE_DELETE_SUCCESS,
    },
    find: {
      status: SUCCESS,
      code: CODE_200,
      message: MESSAGE_SEARCH_SUCCESS,
    },
  },
  error: {
    doesNotExist: (details) => {
      return {
        status: ERROR,
        code: CODE_404,
        message: DATA_NOT_FOUND,
        details,
      };
    },
    validateEndDateGreater: (details) => {
      return {
        status: ERROR,
        code: CODE_400,
        message: DATA_VALIDATION_ERROR,
        details,
      };
    },
  },
};
