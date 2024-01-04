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
 * Returns the aggregate price data for a stock.
 */
const routes = async (fastify) => {
  fastify.get("/stocks/:ticker/history", opts, async (request) => {
    const query = `
      SELECT 
        end_date as date, 
        close_price as price
      FROM price_aggregate 
      WHERE LOWER(ticker) = LOWER($1)
      ORDER BY end_date ASC
    `;
    const params = [request.params.ticker];
    const { rows } = await fastify.pg.query(query, params);
    return rows;
  });
};

export default routes;
