/**
 * Returns a list of all stocks.
 */
const routes = async (fastify) => {
  fastify.get("/stocks", async () => {
    const { rows } = await fastify.pg.query(
      "SELECT id, ticker, full_name FROM stocks"
    );
    return rows;
  });
};

export default routes;
