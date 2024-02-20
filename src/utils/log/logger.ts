import fs from "fs";
import winston from "winston";

const logDirectory = "logs";

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const jsonLogFileFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.prettyPrint()
);

export const logger = winston.createLogger({
  format: jsonLogFileFormat,

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          if (stack) {
            return `${level}: ${timestamp} ${message} - ${stack}`;
          }
          return `${level}: ${timestamp} ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "./logs/app.log", // Corrigido o nome do arquivo aqui
      level: "error",
      handleExceptions: true,
      maxsize: 10485760,
      maxFiles: 10,
    }),
    new winston.transports.Http({
      level: "warn",
      format: winston.format.json(),
    }),
  ],
});
