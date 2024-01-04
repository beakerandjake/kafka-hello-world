const opts = {
  schema: {
    params: {
      ticker: {
        type: "string",
        minLength: 1,
      },
    },
  },
};

/**
 * Returns the latest price data for the stock
 */
const routes = async (fastify) => {
  fastify.get("/stocks/:ticker/price", opts, async (request, reply) => {
    const query = `
      SELECT
        price as open_price,
        (
          SELECT pc.price
          FROM price_changes as pc
          WHERE pc.ticker = s.ticker
          ORDER BY pc.event_date DESC
          LIMIT 1
        ) as latest_price
      FROM stocks as s 
      WHERE LOWER(ticker) = LOWER($1)
      LIMIT 1
    `;
    const params = [request.params.ticker];
    const { rows } = await fastify.pg.query(query, params);
    return rows.length
      ? rows[0]
      : reply.code(404).type("text/html").send("ticker not found");
  });
};

export default routes;
