const AppError = require("../utils/appError");

const sendError = (err, res) => {
  // Operation, trusted error, send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming error or other unknown error
  } else {
    console.log(err.message);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong.",
    });
  }
};

// invalid query param, eg: invalid mongo id
const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// validation error
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((eachError) => {
    return eachError.message;
  });

  const message = `Invalid input data - ${errors.join(". ")}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.status = err.status || "error";
  error.message = err.message;
  error.name = err.name;

  // handle cast error
  if (error.name === "CastError") error = handleCastErrorDb(error);

  // validation errors
  if (error.name === "ValidationError") error = handleValidationError(error);

  sendError(error, res);
};
