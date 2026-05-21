import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  res.on("finish", () => {
    logger.info(`${req.method} ${req.url} ${res.statusCode}`);
  });

  next();
};

export default requestLogger;
