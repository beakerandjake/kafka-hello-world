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
          s.ticker,
          s.open_price as open,
          p.price as latest,
          p.event_date as timestamp
      FROM stocks s
      INNER JOIN (
          SELECT pc.ticker, pc.price, pc.event_date
          FROM price_changes as pc
          WHERE LOWER(pc.ticker) = LOWER($1)
          ORDER BY pc.event_date DESC
          LIMIT 1
      ) p on (p.ticker = s.ticker)
      WHERE LOWER(s.ticker) = LOWER($1);
    `;
    const params = [request.params.ticker];
    const { rows } = await fastify.pg.query(query, params);
    if (!rows.length) {
      return reply.code(404).type("text/html").send("ticker not found");
    }

    const [result] = rows;
    return {
      ...result,
      open: Number(result.open),
      latest: Number(result.latest),
    };
  });
};

export default routes;
