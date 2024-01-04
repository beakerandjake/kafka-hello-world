/**
 * Returns a list of all stocks.
 */
const routes = async (fastify) => {
  fastify.get("/stocks", async () => {
    const query = 'SELECT id, ticker, full_name as "fullName" from stocks';
    const { rows } = await fastify.pg.query(query);
    return rows;
  });
};

export default routes;
