export const customResponse = (response, data) => {
  return {
    status: response.status,
    code: response.code,
    message: response.message,
    data: data,
  };
};
