export function AppError(httpStatusCode, message) {
  const error = new Error();
  error.statusCode = httpStatusCode;
  error.message = message;
  return error;
}
