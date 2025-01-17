import { TASKS_VALIDATION_MESSAGES } from './constants.js';
const {
  TASK_NAME,
  EMAIL,
  DESCRIPTION,
  DATE,
  TEAM_NAME,
  PASSWORD,
  IS_COMPLETED,
  FIND_ALL,
  IS_UUID,
} = TASKS_VALIDATION_MESSAGES;

export const checkIsCompleted = {
  isCompleted: {
    isBoolean: {
      errorMessage: IS_COMPLETED.IS_BOOL_VALIDATION,
    },
    optional: true,
  },
};
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

export const checkTeamName = {
  teamName: {
    isString: {
      errorMessage: TEAM_NAME.TEAM_NAME_STRING_VALIDATION,
    },
    isEmpty: {
      negated: true,
      errorMessage: TEAM_NAME.TEAM_NAME_NOT_EMPTY,
    },
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

export const validatePage = {
  page: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: FIND_ALL.IS_INTEGER,
    },
  },
};

export const validateLimit = {
  limit: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: FIND_ALL.IS_INTEGER,
    },
  },
};

export const validateOrder = {
  order: {
    in: ['query'],
    optional: true,
    isIn: {
      options: [['asc', 'desc']],
      errorMessage: FIND_ALL.ORDER_VALUES,
    },
  },
};

export const validateUuid = {
  uuid: {
    in: ['params'],
    isUUID: {
      errorMessage: IS_UUID,
    },
  },
};
