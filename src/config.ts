import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  redisUrl: process.env.REDIS_URL ?? '',
  sentryDsn: process.env.SENTRY_DSN ?? '',
  datadogEnabled: process.env.DD_ENABLED === 'true',
  datadogHost: process.env.DD_AGENT_HOST ?? 'localhost',
  datadogPort: Number(process.env.DD_AGENT_PORT ?? 8125),
  datadogPrefix: process.env.DD_PREFIX ?? '',
  dataDogServiceName: process.env.DD_SERVICE_NAME ?? 'novamesh-backend',
};
