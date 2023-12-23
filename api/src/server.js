import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Fastify from "fastify";
import postgresPlugin from "@fastify/postgres";
import autoload from "@fastify/autoload";
import ssePlugin from "fastify-sse-v2";
import traps from "@dnlup/fastify-traps";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

fastify.register(traps, { timeout: 1000 });
fastify.register(postgresPlugin, {
  host: process.env.API_PG_HOST,
  port: process.env.API_PG_PORT,
  user: process.env.API_PG_USER,
  password: process.env.API_PG_PASSWORD,
});
fastify.register(ssePlugin);

// register all routes of the api.
fastify.register(autoload, {
  dir: join(dirname(fileURLToPath(import.meta.url)), "routes"),
});

try {
  await fastify.listen({
    host: "0.0.0.0",
    port: process.env.API_PORT || 3000,
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
