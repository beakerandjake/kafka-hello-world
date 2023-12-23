import { EventEmitter } from "node:events";
import { Kafka } from "kafkajs";

const emitter = new EventEmitter();

const kafka = new Kafka({
  clientId: "api",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "api-consumer" });

await consumer.connect();
await consumer.subscribe({
  topic: "stock_price_changes",
  fromBeginning: false,
});

consumer.run({
  eachMessage: ({ message }) => {
    console.log("got a message from kafka", message.value.toString());
    const parsed = JSON.parse(message.value.toString());
    emitter.emit("price_change", parsed);
  },
});

export default emitter;