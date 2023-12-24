import crypto from "node:crypto";
import fp from "fastify-plugin";
import { Kafka } from "kafkajs";
import Emittery from "emittery";

/**
 * Fastify plugin for a simple kafka consumer.
 * Decorates fastify with an EventEmitter 'priceChangeEmitter'
 * The emitter emits 'price_change' events whenever a message is received from kafka.
 */
const plugin = async (fastify, { broker, topic }) => {
  const emitter = new Emittery();
  const kafka = new Kafka({ clientId: "api", brokers: [broker] });
  const consumer = kafka.consumer({
    groupId: crypto.randomBytes(20).toString("hex"),
    retry: { retries: 10 },
  });
  await consumer.connect();
  await consumer.subscribe({ topic });

  // emit each message received from kafka
  consumer.run({
    eachMessage: ({ message }) => {
      const parsed = JSON.parse(message.value.toString());
      emitter.emit("price_change", parsed);
    },
  });

  // clean up on server shutdown.
  fastify.addHook("preClose", async () => {
    fastify.log.info("cleaning up price change emitter");
    emitter.clearListeners();
    await consumer.disconnect();
  });

  fastify.decorate("priceChangeEmitter", emitter);
};

export default fp(plugin, { fastify: "4.x" });

/**
 * Plugin configuration for fastify-autoload
 */
export const autoConfig = {
  broker: process.env.API_KAFKA_BROKER,
  topic: process.env.API_KAFKA_TOPIC,
};
