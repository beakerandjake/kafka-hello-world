import Fastify from "fastify";
import traps from "@dnlup/fastify-traps";
import autoload from "@fastify/autoload";
import postgresPlugin from "@fastify/postgres";
import ssePlugin from "fastify-sse-v2";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({ logger: true });

fastify.register(traps, { timeout: 5000 });
fastify.register(postgresPlugin, {
  host: process.env.API_PG_HOST,
  port: process.env.API_PG_PORT,
  user: process.env.API_PG_USER,
  password: process.env.API_PG_PASSWORD,
});
fastify.register(ssePlugin);

// register all custom plugins.
fastify.register(autoload, { dir: join(__dirname, "plugins") });
fastify.register(autoload, { dir: join(__dirname, "routes") });

try {
  await fastify.listen({
    host: "0.0.0.0",
    port: process.env.API_PORT || 3000,
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
