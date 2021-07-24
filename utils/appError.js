class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // JS Error accepts one arg for message
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // operational error/ not code related bug

    Error.captureStackTrace(this, this.constructor); // so that this class is not captured in the stack trace
  }
}

module.exports = AppError;
