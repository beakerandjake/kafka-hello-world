/**
 * Provides real time price updates for the stock.
 */
const routes = async (fastify) => {
  fastify.get("/stocks/realtime", {}, async (request, reply) => {
    // emit sse on price change.
    const handler = (message) => {
      const { date, ...rest } = message;
      reply.sse({ data: JSON.stringify({ ...rest, timestamp: date }) });
    };

    // subscribe to price change events while the connection is open.
    fastify.priceChangeEmitter.on("price_change", handler);
    request.socket.on("close", () => {
      fastify.priceChangeEmitter.off("price_change", handler);
    });

    // force fastify to keep connection open.
    return reply;
  });
};

export default routes;
