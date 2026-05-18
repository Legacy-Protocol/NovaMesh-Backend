import { createClient } from 'redis';
import { config } from '../config';
import { logger } from './logger';

export const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on('error', (error) => {
  logger.error('Redis error', { error });
});

export async function connectRedis() {
  if (!config.redisUrl) {
    logger.warn('Redis is not configured. Caching will be disabled.');
    return;
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
    logger.info('Connected to Redis');
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!config.redisUrl) {
    return null;
  }

  const value = await redisClient.get(key);
  return value ? (JSON.parse(value) as T) : null;
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 60) {
  if (!config.redisUrl) {
    return;
  }

  await redisClient.set(key, JSON.stringify(value), {
    EX: ttlSeconds,
  });
}

export async function cacheDel(key: string) {
  if (!config.redisUrl) {
    return;
  }

  await redisClient.del(key);
}
