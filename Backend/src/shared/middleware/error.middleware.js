import logger from "../utils/logger.js";

export const errorHandling = async (err, req, res, next) => {
  console.log(err.stack);
  const statusCode = err.statusCode || 500;
  logger.error(
    `${req.method} ${req.originalUrl} ${statusCode} - ${err.message}/n`,
  );

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.message,
  });
};
