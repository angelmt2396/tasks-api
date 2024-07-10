import { TASKS_VALIDATION_MESSAGES } from './constants.js';
const { TASK_NAME, EMAIL, DESCRIPTION, DATE, NICKNAME, PASSWORD } =
  TASKS_VALIDATION_MESSAGES;

export const checkName = {
  name: {
    isString: {
      errorMessage: TASK_NAME.TASK_NAME_STRING_VALIDATION,
    },
    isEmpty: {
      negated: true,
      errorMessage: TASK_NAME.TASK_NAME_NOT_EMPTY,
    },
  },
};

export const checkNickName = {
  nickname: {
    isString: {
      errorMessage: NICKNAME.NICKNAME_STRING_VALIDATION,
    },
    isEmpty: {
      negated: true,
      errorMessage: NICKNAME.NICKNAME_NOT_EMPTY,
    },
    optional: true,
  },
};

export const checkPassword = {
  password: {
    isString: {
      errorMessage: PASSWORD.PASSWORD_STRING_VALIDATION,
    },
    isEmpty: {
      negated: true,
      errorMessage: PASSWORD.PASSWORD_NOT_EMPTY,
    },
  },
};

export const optionalCheckName = {
  name: {
    ...checkName.name,
    optional: true,
  },
};

export const checkEmail = {
  assignedPersonEmail: {
    isEmail: {
      errorMessage: EMAIL.FORMAT_EMAIL_VALIDATION,
    },
    isEmpty: {
      negated: true,
      errorMessage: EMAIL.EMPTY_EMAIL_VALIDATION,
    },
    optional: true,
  },
};

export const checkDescription = {
  description: {
    errorMessage: DESCRIPTION.IS_STRING_MESSAGE,
  },
};

export const optionalCheckDescription = {
  description: {
    ...checkDescription.description,
    optional: true,
  },
};

const validateDate = {
  isISO8601: {
    errorMessage: DATE.VALIDATE_ISO_DATE,
  },
  optional: true,
};
export const checkStartDate = {
  startDate: validateDate,
};

export const checkEndDateToCreate = {
  endDate: {
    ...validateDate,
    custom: {
      options: (value, { req }) => {
        const { startDate, endDate } = req.body;
        if (!startDate) {
          throw new Error(DATE.VALIDATE_START_DATE_REQUIRED);
        }
        validateEndDateGreater(startDate, endDate);
        return true;
      },
    },
  },
};

export const checkEndDateToUpdate = {
  endDate: {
    ...validateDate,
    custom: {
      options: (value, { req }) => {
        const { startDate, endDate } = req.body;
        if (startDate) {
          validateEndDateGreater(startDate, endDate);
        }
        return true;
      },
    },
  },
};

export const validateEndDateGreater = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) {
    throw new Error(DATE.VALIDATE_END_DATE_GREATER);
  }
};
