const routes = async (fastify) => {
  fastify.get("/stocks", async (request, response) => {
    return "hello world!";
  });
};

export default routes;
