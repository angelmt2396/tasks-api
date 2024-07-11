import { CustomException } from '../utils/custom-exception.js';
export const HandleException = (err, req, res, next) => {
  if (err) {
    console.log(err);
    const { status, message, code, details } = new CustomException(err);
    return res.status(code).json({ status, message, code, details });
  }
  next();
};
