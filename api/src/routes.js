const routes = async (fastify) => {
  fastify.get("/stocks", async () => {
    const { rows } = await fastify.pg.query(
      "SELECT id, ticker, full_name FROM stocks"
    );
    return rows;
  });

  let clientId = 0;

  fastify.get("/stocks/realtime", { websocket: true }, (connection, req) => {
    const id = clientId++;
    const interval = setInterval(() => {
      connection.socket.send(JSON.stringify(["COOL", 123.46, id]));
    }, 1000);

    fastify.log.info("connected to client");
    connection.socket.send(`hello from server, client: ${id}`);

    connection.socket.on("message", (message) => {
      fastify.log.info(`message from client ${id}: ${message}`);
    });

    connection.socket.on("close", () => {
      fastify.log.info(`client: ${id} disconnect`);
      clearInterval(interval);
    });
  });
};

// look into mqemitter

export default routes;
