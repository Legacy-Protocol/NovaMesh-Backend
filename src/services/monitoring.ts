import StatsD from 'hot-shots';
import { config } from '../config';
import { logger } from './logger';

export const metrics = config.datadogEnabled
  ? new StatsD({
      host: config.datadogHost,
      port: config.datadogPort,
      prefix: `${config.datadogPrefix || 'novamesh.'}`,
      globalTags: { service: config.dataDogServiceName },
    })
  : null;

export function trackMetric(name: string, value: number) {
  if (!metrics) {
    return;
  }
  metrics.gauge(name, value);
}

export function initMonitoring() {
  if (metrics) {
    logger.info('Datadog monitoring is enabled');
  } else {
    logger.info('Datadog monitoring is disabled');
  }
}
