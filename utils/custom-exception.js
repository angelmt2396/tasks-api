import { CODE_500, ERROR, INTERNAL_SERVER_ERROR } from './constants.js';
export class CustomException extends Error {
  constructor(error) {
    super(error?.message || INTERNAL_SERVER_ERROR);
    this.status = ERROR;
    this.message = error?.message || INTERNAL_SERVER_ERROR;
    this.code = error?.code && error?.code < 600 ? error.code : CODE_500;
    this.details = error?.details ?? null;
  }
}
