// import winston from "winston";

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.printf(({ level, message, timestamp, module }) => {
//       return `${timestamp} [${level}] [${module || "general"}]: ${message}`;
//     }),
//   ),
//   transports: [
//     new winston.transports.File({ filename: "logs/error.log", level: "error" }),
//     new winston.transports.File({ filename: "logs/combined.log" }),
//   ],
// });

// export default logger;

import winston from "winston";

const isVercel = process.env.VERCEL === "1";

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
];

// لو مش على Vercel، اكتب في ملف
import winston from "winston";
import fs from "fs";

const isVercel = process.env.VERCEL === "1";

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
];

if (!isVercel) {
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs", { recursive: true });
  }

  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  );
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports,
});

export default logger;
