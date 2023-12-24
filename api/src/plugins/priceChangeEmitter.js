import crypto from "node:crypto";
import fp from "fastify-plugin";
import kafka from "node-rdkafka";
import Emittery from "emittery";

const createReadStream = ({ broker, topics }) => {
  const globalConfig = {
    "group.id": crypto.randomBytes(20).toString("hex"),
    "metadata.broker.list": broker,
  };
  const streamOptions = { topics };
  return kafka.KafkaConsumer.createReadStream(globalConfig, {}, streamOptions);
};

/**
 * Decorates fastify with an EventEmitter 'priceChangeEmitter'.
 * This emitter emits 'price_change' events which come from kafka.
 */
const plugin = async (fastify, options) => {
  const emitter = new Emittery();
  const stream = createReadStream(options);

  // emit price change events on each kafka message received
  stream.on("data", (message) => {
    const parsed = JSON.parse(message.value.toString());
    emitter.emit("price_change", parsed);
  });

  // listen to server shutdown events and clean up.
  fastify.addHook("onClose", async () => {
    fastify.log.info("cleaning up price change emitter");
    emitter.clearListeners();
    await new Promise((resolve) => {
      stream.close(resolve);
    });
  });

  fastify.decorate("priceChangeEmitter", emitter);
};

export default fp(plugin, { fastify: "4.x" });

/**
 * Plugin configuration for fastify-autoload
 */
export const autoConfig = {
  broker: process.env.API_KAFKA_BROKER,
  topics: process.env.API_KAFKA_TOPIC,
};
