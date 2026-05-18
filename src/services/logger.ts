import expressWinston from 'express-winston';
import winston from 'winston';
import { config } from './../config';

const consoleTransport = new winston.transports.Console({
  format:
    config.nodeEnv === 'production'
      ? winston.format.json()
      : winston.format.combine(winston.format.colorize(), winston.format.simple()),
});

export const logger = winston.createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  transports: [consoleTransport],
});

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  statusLevels: true,
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: false,
  colorize: config.nodeEnv !== 'production',
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
});
