/**
 * Returns a list of all stocks.
 */
const routes = async (fastify) => {
  fastify.get("/stocks", async () => {
    const { rows } = await fastify.pg.query(`
      SELECT 
        id,
        ticker, 
        full_name,
        price as open_price, 
        (
          SELECT pc.price
          FROM price_changes as pc
          WHERE pc.ticker = s.ticker
          ORDER BY pc.event_date DESC
          LIMIT 1
        ) as latest_price
      FROM stocks as s
    `);

    return rows.map((x) => ({
      id: x.id,
      ticker: x.ticker,
      name: x.full_name,
      openPrice: x.latest_price != null ? Number(x.open_price) : null,
      latestPrice: x.latest_price != null ? Number(x.latest_price) : null,
    }));
  });
};

export default routes;
