import AppError from "../utils/appError.js";

const sendErrorDev = (err, res) => {
  // For CastError with ObjectId kind, simplify the message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(404).json({
      status: "fail",
      message: "Resource not found",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "fail",
      message: "Token expired, please log in again",
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      status: "fail",
      message: `Duplicate field value: ${
        err.keyValue ? Object.values(err.keyValue)[0] : ""
      }. Please use another value!`,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Production error handler - hides sensitive error details
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown error: don't leak error details
    console.error("ERROR 💥", err.name);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

// Handle MongoDB cast error (invalid ID format)
const handleCastErrorDB = (err) => {
  // Special handling for ObjectId errors in document lookups
  if (err.kind === "ObjectId") {
    return new AppError("Resource not found", 404);
  }

  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Handle duplicate key error
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue ? Object.values(err.keyValue)[0] : "";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle validation errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
