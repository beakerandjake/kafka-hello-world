const routes = async (fastify) => {
  fastify.get("/stocks", async () => {
    const { rows } = await fastify.pg.query(
      "SELECT id, ticker, full_name FROM stocks"
    );
    return rows;
  });

  fastify.get("/stocks/realtime", { websocket: true }, (connection, req) => {
    connection.socket.on("message", (message) => {
      connection.socket.send("hi from server");
    });
  });
};

// look into mqemitter

export default routes;
