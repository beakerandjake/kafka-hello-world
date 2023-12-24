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
    const { ticker } = request.params;
    if (!(await tickerExists(ticker))) {
      return reply.code(404).type("text/html").send("Could not find ticker");
    }

    // emit sse if this price change corresponds to our ticket.
    const handler = (message) => {
        reply.sse({ data: JSON.stringify(message) });
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
