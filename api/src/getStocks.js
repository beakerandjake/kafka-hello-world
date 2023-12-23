const routes = async (fastify) => {
  fastify.get("/stocks", async (request, response) => {
    const { rows } = await fastify.pg.query("SELECT COUNT(*) FROM stocks");
    return rows;
  });
};

export default routes;
