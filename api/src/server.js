import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";
import postgresPlugin from "@fastify/postgres";
import traps from "@dnlup/fastify-traps";
import routes from "./routes.js";

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
fastify.register(websocketPlugin);
fastify.register(routes);

try {
  await fastify.listen({
    host: "0.0.0.0",
    port: process.env.API_PORT || 3000,
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
