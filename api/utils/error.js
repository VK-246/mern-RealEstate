export const errorHandler = (statusCode, message) => {
  // This function creates a new error object with a status code and message.
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};