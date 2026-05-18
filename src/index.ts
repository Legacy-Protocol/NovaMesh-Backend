import app from './app';
import { config } from './config';
import { connectRedis } from './services/redis';
import { registerGraphQL } from './graphql/server';
import { logger } from './services/logger';

const port = config.port;

async function main() {
  if (config.redisUrl) {
    await connectRedis();
  }

  await registerGraphQL(app);

  app.listen(port, () => {
    logger.info(`NovaMesh backend listening on http://localhost:${port}`);
  });
}

main().catch((error) => {
  logger.error('Server startup failed', { error });
  process.exit(1);
});
