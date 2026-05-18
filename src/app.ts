import express from 'express';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth';
import { agentRouter } from './routes/agents';
import { paymentRouter } from './routes/payments';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';
import { config } from './config';
import { requestLogger, errorLogger } from './services/logger';
import { initMonitoring } from './services/monitoring';

if (config.sentryDsn) {
  Sentry.init({
    dsn: config.sentryDsn,
    tracesSampleRate: 0.1,
    environment: config.nodeEnv,
  });
}

const app = express();

if (config.sentryDsn) {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ service: 'NovaMesh Backend', status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/agents', agentRouter);
app.use('/payments', paymentRouter);

app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

initMonitoring();

export default app;
