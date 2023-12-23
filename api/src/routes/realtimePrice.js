// schema to validate the query params
const opts = {
  schema: {
    params: {
      type: "object",
      properties: {
        ticker: { type: "string", minLength: 1, maxLength: 10 },
      },
    },
  },
};

/**
 * Provides real time price updates for the stock.
 */
const routes = async (fastify) => {
  // checks the db to see if the ticket is known.
  const tickerExists = async (ticker) => {
    const { rows } = await fastify.pg.query(
      "SELECT EXISTS(SELECT 1 FROM stocks WHERE LOWER(ticker) = LOWER($1))",
      [ticker]
    );
    return rows[0].exists;
  };

  // pushing price updates to the client via sse.
  fastify.get("/stocks/:ticker/realtime", opts, async (request, reply) => {
    // can't subscribe to stock which doesn't exist.
    const { ticker } = request.params;
    if (!(await tickerExists(ticker))) {
      return reply.code(404).type("text/html").send("Could not find ticker");
    }

    const handler = (message) => {
      fastify.log.info(`got message: ${JSON.stringify(message)}`);
      reply.sse({ data: message });
    };

    // listen and broadcast price events while connection is open.
    fastify.priceChangeEmitter.on("price_change", handler);

    // stop listening to price change events when connection is closed.
    request.socket.on("close", () => {
      fastify.priceChangeEmitter.off("price_change", handler);
    });

    // force fastify to keep connection open.
    return reply;
  });
};

export default routes;
