import Fastify from "fastify";
import getStocks from "./getStocks.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(getStocks);

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

await start();
