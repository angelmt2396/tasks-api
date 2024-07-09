export const TASKS_VALIDATION_MESSAGES = {
  TASK_NAME: {
    TASK_NAME_STRING_VALIDATION: 'Name must be a string',
    TASK_NAME_NOT_EMPTY: 'Name should not be empty',
  },
  EMAIL: {
    EMPTY_EMAIL_VALIDATION: 'Email should not be empty',
    FORMAT_EMAIL_VALIDATION: 'Incorrect email format',
  },
  DESCRIPTION: {
    IS_STRING_MESSAGE: 'Description must be a string',
  },
  DATE: {
    VALIDATE_ISO_DATE: 'Date must be a valid ISO 8601 date',
    VALIDATE_END_DATE_GREATER: 'End date must be greater than start date',
    VALIDATE_START_DATE_REQUIRED:
      'Start date is required if end date is provided',
  },
};

export const SUCCESS = 'success';
export const CODE_201 = 201;
export const CODE_400 = 400;
export const CODE_200 = 200;
export const CODE_500 = 500;
export const CODE_404 = 404;
export const ERROR = 'error';
export const DATA_VALIDATION_ERROR = 'Data validation error.';
export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const MESSAGE_CREATE_SUCCESS = 'successfully created.';
export const MESSAGE_UPDATE_SUCCESS = 'successfully updated.';
export const MESSAGE_DELETE_SUCCESS = 'successfully deleted.';
export const MESSAGE_SEARCH_SUCCESS = 'successfully search results.';
export const DATA_NOT_FOUND = 'data not found';
export const TASK_DOES_NOT_EXIST = 'Tasks does not exist';