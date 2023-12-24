import { EventEmitter } from "node:events";
import fp from "fastify-plugin";
import { Kafka } from "kafkajs";

/**
 * Decorates fastify with an EventEmitter 'priceChangeEmitter'.
 * This emitter emits 'price_change' events which come from kafka.
 */
const plugin = async (fastify, options) => {
  const emitter = new EventEmitter();
  const kafka = new Kafka({ clientId: "api", brokers: ["kafka:9092"] });
  const consumer = kafka.consumer({ groupId: "api-consumer" });
  await consumer.connect();
  await consumer.subscribe({
    topic: "stock_price_changes",
    fromBeginning: false,
  });

  consumer.run({
    eachMessage: ({ message }) => {
      const parsed = JSON.parse(message.value.toString());
      emitter.emit("price_change", parsed);
    },
  });

  fastify.addHook("onClose", async () => {
    fastify.log.info("cleaning up price change emitter");
    emitter.removeAllListeners();
    await consumer.disconnect();
  });

  fastify.decorate("priceChangeEmitter", emitter);
};

export default fp(plugin, { fastify: "4.x" });
